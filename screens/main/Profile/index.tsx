import React from 'react'
import { StyleSheet } from 'react-native'
import { MainScreenProps } from '../../../types/navigation'
import { Layout } from '@ui-kitten/components'
import { userUserFromStore as useUserFromStore } from '../../../utils/useUserFromStore'
import { SplashScreen } from '../../../components/splash'
import { VCList } from './components/VCList'
import { DataItem, Group } from './components'
import { SignInfo } from './components/SignInfo'
import { ScrollView } from 'react-native-gesture-handler'
import { clear } from '../../../api/storage'

export function Profile(props: MainScreenProps<'Profile'>) {
  const { user, isLoading } = useUserFromStore()

  console.log({ user })

  if (isLoading) {
    return <SplashScreen />
  }

  console.log(user.lastName)

  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Group title="Пользователь">
          <DataItem label="Фамилия" info={user.lastName} />
          <DataItem label="Имя" info={user.firstName} />
          <DataItem label="Отчество" info={user.patronymic} />
          <DataItem label="Прочие данные" info={user.otherInfo} />
        </Group>

        <SignInfo />

        <Group title="Удостоверения личности">
          <VCList />
        </Group>
      </ScrollView>
    </Layout>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 40,
  },
  panel: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 4,
    marginBottom: 12,
  },
  title: {
    fontWeight: '500',
    marginBottom: 16,
    color: '#858585',
  },
})
