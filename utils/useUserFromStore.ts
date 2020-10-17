import * as React from 'react'
import * as storageAPI from '../api/storage'

export function usePassportFromStore() {
  // TODO - replace passport with user
  const [status, setStatus] = React.useState<Status>('reading')
  const [passport, setPassport] = React.useState<any>()

  React.useEffect(() => {
    storageAPI
      .getVC()
      .then((vc) => {
        setPassport(vc)
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
