import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { MainScreenProps } from '../../types/navigation'
import { Layout, Text } from '@ui-kitten/components'
import { TopNavigation } from '../../components/top-navigator'

export function DocumentChat(props: MainScreenProps<'DocumentChat'>) {
  console.log(props)

  return (
    <Layout style={styles.container}>
      <TopNavigation title="Документы" onPress={props.navigation.goBack} />
      <Text category="p1">{props.route.params.data}</Text>
      <ScrollView style={{ flex: 1 }}></ScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 40,
  },
})
