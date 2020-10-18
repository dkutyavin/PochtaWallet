import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { MainScreenProps } from '../../types/navigation'
import {
  Divider,
  Icon,
  Layout,
  Text,
  Toggle,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import { userUserFromStore } from '../../utils/useUserFromStore'
import { usePassportFromStore } from '../../utils/usePassportFromStore'
import { SplashScreen } from '../../components/splash'
import { PUBLIC_KEY } from '../../api/network/config'

export function VCDetails(props: MainScreenProps<'VCDetails'>) {
  const { user, isLoading: isUserLoading } = userUserFromStore()
  const { passport, isLoading: isPassportLoading } = usePassportFromStore()

  const [checked, setChecked] = React.useState(false)

  const userFromPassport = passport?.payload?.vc?.credentialSubject || {}

  if (isUserLoading || isPassportLoading) {
    return <SplashScreen />
  }

  return (
    <Layout style={styles.container}>
      <TopNavigation
        accessoryLeft={BackAction}
        title={(evaProps) => <Text {...evaProps}>Профиль</Text>}
        subtitle={(evaProps) => <Text {...evaProps}>Назад</Text>}
      />

      <ScrollView style={{ flex: 1 }}>
        <DataItem label="Фамилия" info={user.lastName} />
        <DataItem label="Имя" info={user.firstName} />
        <DataItem label="Отчество" info={user.patronymic} />

        <DataItem label="Дата рождения" info={formatDate(userFromPassport.birthDayDate)} />
        <DataItem label="Пол" info={userFromPassport.gender} />
        <DataItem label="Место рождения" info={userFromPassport.birthPlace} />
        <DataItem
          label="Серия и номер"
          info={userFromPassport.passportSerial + ' ' + userFromPassport.passportNumber}
        />
        <DataItem label="Наименование органа" info={userFromPassport.passportIssuer} />
        <DataItem label="Эмитент VC" info="Почта России" />

        <Divider style={{ marginVertical: 20 }} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Toggle checked={checked} onChange={setChecked} />
          <Text category="h5">Техническая информация</Text>
        </View>

        {checked && (
          <View style={{ marginTop: 20 }}>
            <DataItem label="Публичный адрес эмитента" info={PUBLIC_KEY} />
          </View>
        )}
      </ScrollView>
    </Layout>
  )
}

function formatDate(date: string) {
  const minTwoChar = (str: string) => {
    if (str.length < 2) return `0${str}`
    return str
  }

  return date.split('/').map(minTwoChar).join('.')
}

function DataItem({ label, info }: { label: string; info: any }) {
  return (
    <View style={{ justifyContent: 'space-between', marginBottom: 10 }}>
      <Text style={{ color: '#858585', fontSize: 18, fontWeight: '300' }}>{label}</Text>
      <Text category="h5">{info || '--'}</Text>
    </View>
  )
}

const BackAction = () => <TopNavigationAction icon={BackIcon} />
const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 40,
  },
})
