import * as React from 'react'
import * as storageAPI from '../api/storage'

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
    storageAPI.getToken().then((token) => {
      if (token) {
        setStatus('auth')
      } else {
        setStatus('new')
      }
    })
  }, [])

  return status
}

type State = ReturnType<typeof useStateValue>
