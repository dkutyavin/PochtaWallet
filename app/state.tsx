import * as React from 'react'

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
  const [user, setUser] = React.useState<typeof defaultUser & Record<string, any>>(defaultUser)
  const [isRegistered, setIsRegistered] = React.useState(false)
  const [searchPhrase, setSearchPhrase] = React.useState('')
  const [selectedGoodId, setSelectedGoodId] = React.useState('')
  const [currentMessage, setCurrentMessage] = React.useState('')
  const [currentChat, setCurrentChat] = React.useState<
    Array<{ type: 'client' | 'seller'; message: string }>
  >([])

  const saveToUser = (newFields: Partial<typeof user>) => {
    setUser((prev) => ({ ...prev, ...newFields }))
  }

  const value = {
    isRegistered,
    register: () => setIsRegistered(true),
    user,
    saveToUser,
    searchPhrase,
    setSearchPhrase,
    selectedGoodId,
    setSelectedGoodId,
    currentMessage,
    setCurrentMessage,
    currentChat,
    setCurrentChat,
  }

  return value
}

export function useAppState() {
  return React.useContext(AppStateContext)
}

type State = ReturnType<typeof useStateValue>
