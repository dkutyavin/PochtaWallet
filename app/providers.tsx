import * as React from 'react'
import * as eva from '@eva-design/eva'
import { NavigationContainer } from '@react-navigation/native'
import { AppStateProvider } from './state'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

export function Providers({ children }: React.PropsWithChildren<{}>) {
  return (
    <NavigationContainer>
      <UIKittenProvider>
        <AppStateProvider>{children}</AppStateProvider>
      </UIKittenProvider>
    </NavigationContainer>
  )
}

function UIKittenProvider({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        {children}
      </ApplicationProvider>
    </>
  )
}
