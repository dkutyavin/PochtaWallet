import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MainScreenProps } from '../../types/navigation'
import { Button, Card, Icon, Layout, List, ListItem, Text } from '@ui-kitten/components'
import * as networkAPI from '../../api/network'
import * as biometricCryptoAPI from '../../api/biometricCrypto'
import { useDocuments } from '../../utils/useDocuments'
import { SplashScreen } from '../../components/splash'

export function Documents(props: MainScreenProps<'Documents'>) {
  const { isLoading, documents, refetch } = useDocuments()
  const onChat = (messages: string) => {
    props.navigation.navigate('DocumentChat', { data: messages })
  }

  if (isLoading) {
    return <SplashScreen />
  }

  const signChallenge = async (id: string, challenge: string) => {
    const signedChallenge = await biometricCryptoAPI.signWithBiometricKey(challenge)
    await networkAPI.signVcChallenge(id, signedChallenge)
    await refetch()
  }

  return (
    <Layout style={styles.container}>
      <Text category="h3" style={{ marginTop: 30, marginBottom: 20 }}>
        Договоры
      </Text>

      <List
        style={{ backgroundColor: 'white' }}
        data={documents}
        renderItem={(props) => <DocumentCard {...props} onSign={signChallenge} onChat={onChat} />}
      />
    </Layout>
  )
}

const DocumentCard = ({ item, onSign, onChat, onContract }: any) => {
  const { data, status, id, challenge } = item

  const signed = status !== 'AWAITING_SIGNATURE'

  const handleSign = () => {
    onSign(id, challenge)
  }

  return (
    <Card style={{ marginTop: 10 }} status="info">
      <DataItem label="Продавец" info={data?.seller?.FIO} />
      <DataItem label="Продавец" info={data?.buyer?.FIO} />
      <DataItem label="Цена" info={data?.price} />
      <DataItem label="Товар" info={data?.productName} />
      <DataItem label="Статус" info={<DocStatus signed={signed} />} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button size="small" status="basic" onPress={() => onChat(data.chatBody)}>
          История чата
        </Button>
        <Button size="small" status="info" onPress={() => onChat(data.contractBody)}>
          Договор
        </Button>
      </View>

      {!signed && (
        <Button style={{ marginTop: 10 }} onPress={handleSign}>
          Подписать
        </Button>
      )}
    </Card>
  )
}

function DocStatus({ signed }: { signed: boolean }) {
  if (signed) {
    return <Text status="success">Подписан</Text>
  }
  return <Text status="info">Ожидает подписи</Text>
}

export function DataItem({ label, info }: { label: string; info: any }) {
  return (
    <View style={{ justifyContent: 'space-between', marginBottom: 10 }}>
      <Text style={{ color: '#858585', fontSize: 18, fontWeight: '300' }}>{label}</Text>
      <Text category="h6">{info || '--'}</Text>
    </View>
  )
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
