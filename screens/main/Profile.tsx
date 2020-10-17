import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MainScreenProps } from '../../types/navigation'
import { Layout, Text, Divider, Icon, ListItem, List } from '@ui-kitten/components'
import { usePassportFromStore } from '../../utils/useUserFromStore'
import { SplashScreen } from '../../components/splash'

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
      <View style={styles.panel}>
        <Text category="h4" style={{ fontWeight: '500', marginBottom: 6, color: '#858585' }}>
          Пользователь
        </Text>
        <Divider style={{ marginTop: 10 }} />

        <DataItem label="Фамилия" info={lastName} />
        <DataItem label="Имя" info={firstName} />
        <DataItem label="Отчество" info={patronymic} />
        <DataItem label="Прочие данные" info={user.otherInfo} />
      </View>

      <View style={{ ...styles.panel, minHeight: 220, justifyContent: 'flex-start', flex: 0 }}>
        <Text style={{ fontSize: 22, fontWeight: '500', marginBottom: 6, color: '#858585' }}>
          Удостоверения личности
        </Text>
        <Divider style={{ marginTop: 10 }} />

        <ListAccessoriesShowcase />
      </View>
    </Layout>
  )
}

const ListAccessoriesShowcase = () => {
  const passport = [{ title: 'Выдан: Почта России', description: 'Тип документа: Паспорт РФ' }]

  const renderItemIcon = (props: any) => <Icon {...props} name="person" />

  const renderItem = ({ item }: any) => (
    <ListItem title={item.title} description={item.description} accessoryLeft={renderItemIcon} />
  )

  return <List style={{ backgroundColor: 'white' }} data={passport} renderItem={renderItem} />
}

const styles = StyleSheet.create({
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
})

export function DataItem({ label, info }: { label: string; info: string }) {
  return (
    <View style={{ justifyContent: 'space-between', marginBottom: 10 }}>
      <Text style={{ color: '#858585', fontSize: 18, fontWeight: '300' }}>{label}</Text>
      <Text category="h5">{info || '--'}</Text>
    </View>
  )
}
