import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MainScreenProps } from '../../../types/navigation'
import { Layout, Text } from '@ui-kitten/components'
import { usePassportFromStore } from '../../../utils/useUserFromStore'
import { SplashScreen } from '../../../components/splash'
import { VCList } from './components/VCList'
import { Group } from './components'

export function Profile(props: MainScreenProps<'Profile'>) {
  const { passport, isLoading } = usePassportFromStore()

  console.log({ passport })

  if (isLoading) {
    return <SplashScreen />
  }

  const user = passport?.payload?.vc?.credentialSubject

  const [firstName, patronymic, lastName] = user.name.replace(/\s{2,}/, ' ').split(' ')

  return (
    <Layout style={styles.container}>
      <Group title="Пользователь">
        <DataItem label="Фамилия" info={lastName} />
        <DataItem label="Имя" info={firstName} />
        <DataItem label="Отчество" info={patronymic} />
        <DataItem label="Прочие данные" info={user.otherInfo} />
      </Group>

      <Group title="Удостоверения личности">
        <VCList />
      </Group>
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

export function DataItem({ label, info }: { label: string; info: string }) {
  return (
    <View style={{ justifyContent: 'space-between', marginBottom: 10 }}>
      <Text style={{ color: '#858585', fontSize: 18, fontWeight: '300' }}>{label}</Text>
      <Text category="h5">{info || '--'}</Text>
    </View>
  )
}
