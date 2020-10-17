import * as React from 'react'
import { SplashScreen } from '../components/splash'
import { MainApp } from './main'
import { Registration } from './registration'
import { useAppState } from './state'

export function Root() {
  const { isRegistered, status } = useAppState()

  if (status === 'check') {
    return <SplashScreen />
  }

  return isRegistered ? <MainApp /> : <Registration />
}
