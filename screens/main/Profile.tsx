import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { MainScreenProps } from '../../types/navigation'
import { Layout, Text, Divider, Button, Icon, ListItem, List } from '@ui-kitten/components'
import { useAppState } from '../../app/state'

export function Profile(props: MainScreenProps<'Profile'>) {
  const { user } = useAppState()

  return (
    <Layout style={styles.container}>
      <ScrollView>
        <View style={styles.panel}>
          <Text style={{ fontSize: 22, fontWeight: '500', marginBottom: 6, color: '#858585' }}>
            Пользователь
          </Text>
          <Divider style={{ marginTop: 10 }} />

          <DataItem label="Фамилия" info={user.lastName} />
          <DataItem label="Имя" info={user.firstName} />
          <DataItem label="Отчество" info={user.patronymic} />
          <DataItem label="Прочие данные" info={user.otherInfo} />
        </View>

        <View style={{ ...styles.panel, minHeight: 220, justifyContent: 'flex-start', flex: 0 }}>
          <Text style={{ fontSize: 22, fontWeight: '500', marginBottom: 6, color: '#858585' }}>
            Удостоверения личности
          </Text>
          <Divider style={{ marginTop: 10 }} />

          <ListAccessoriesShowcase />
        </View>
      </ScrollView>
    </Layout>
  )
}

// TODO
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
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
      <Text style={{ color: '#858585', fontSize: 18, fontWeight: '300', textAlign: 'right' }}>
        {label}
      </Text>
      <Text style={{ fontSize: 18, textAlign: 'right' }}>{info}</Text>
    </View>
  )
}
