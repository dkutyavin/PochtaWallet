import * as React from 'react'
import { MainApp } from './main'
import { Registration } from './registration'
import { useAppState } from './state'

export function Root() {
  const { isRegistered } = useAppState()
  return isRegistered ? <MainApp /> : <Registration />
}
