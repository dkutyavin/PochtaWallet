import * as React from 'react'
import * as storageAPI from '../api/storage'

export function usePassportFromStore() {
  const [status, setStatus] = React.useState<Status>('reading')
  const [passport, setUser] = React.useState<any>()

  React.useEffect(() => {
    storageAPI
      .getVC()
      .then((user) => {
        setUser(user)
        setStatus('ready')
      })
      .catch((error) => {
        console.warn(error)
        setStatus('error')
      })
  }, [])

  return { passport, isLoading: status === 'reading' }
}

type Status = 'reading' | 'error' | 'ready'
