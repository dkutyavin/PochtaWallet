import * as React from 'react'
import * as storageAPI from '../api/storage'
import * as cryptoAPI from '../api/biometricCrypto/crypto'

const AppStateContext = React.createContext<State>(null as any)

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const value = useStateValue()

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

const defaultUser = {
  firstName: '--',
  lastName: '--',
  patronymic: '--',
  otherInfo: '--',
}

function useStateValue() {
  const status = useInitCheck()

  const [user, setUser] = React.useState<typeof defaultUser & Record<string, any>>(defaultUser)
  const [isRegistered, setIsRegistered] = React.useState(false)

  React.useEffect(() => {
    if (status === 'auth') {
      setIsRegistered(true)
    } else {
      setIsRegistered(false)
    }
  }, [status])

  const saveToUser = (newFields: Partial<typeof user>) => {
    setUser((prev) => ({ ...prev, ...newFields }))
  }

  const value = {
    isRegistered,
    register: () => setIsRegistered(true),
    user,
    saveToUser,
    status,
  }

  return value
}

export function useAppState() {
  return React.useContext(AppStateContext)
}

function useInitCheck() {
  const [status, setStatus] = React.useState<'check' | 'auth' | 'new'>('check')

  React.useEffect(() => {
    const effect = async () => {
      const token = await storageAPI.getToken()
      // const { publicKey } = await cryptoAPI.getPublicKeys()
      // const key = await storageAPI.getKey()

      // console.log({ token, publicKey, key })

      if (token) {
        setStatus('auth')
      } else {
        setStatus('new')
      }

      const pubkey = await cryptoAPI.getPublicKeys()
      const passport = await storageAPI.getVC()

      console.log({ token, passport, ...pubkey })
    }

    effect()
  }, [])

  return status
}

type State = ReturnType<typeof useStateValue>
