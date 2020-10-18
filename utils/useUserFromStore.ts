import * as React from 'react'
import * as storageAPI from '../api/storage'

export function userUserFromStore() {
  const [status, setStatus] = React.useState<Status>('reading')
  const [user, setUser] = React.useState<any>()

  React.useEffect(() => {
    storageAPI
      .getUser()
      .then((user) => {
        setUser(user)
        setStatus('ready')
      })
      .catch((error) => {
        console.warn(error)
        setStatus('error')
      })
  }, [])

  return { user, isLoading: status === 'reading' }
}

type Status = 'reading' | 'error' | 'ready'
