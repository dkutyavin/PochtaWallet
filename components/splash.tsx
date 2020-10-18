import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Spinner } from '@ui-kitten/components'

export function SplashScreen() {
  return (
    <Layout style={styles.contatainer}>
      <Spinner size="giant" />
    </Layout>
  )
}

const styles = StyleSheet.create({
  contatainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
