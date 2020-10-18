import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MainScreenProps } from '../../types/navigation'
import { Button, Card, Icon, Layout, List, ListItem, Text } from '@ui-kitten/components'
import * as networkAPI from '../../api/network'
import * as biometricCryptoAPI from '../../api/biometricCrypto'

export function Documents(props: MainScreenProps<'Documents'>) {
  const [documents, setDocuments] = React.useState<any[]>([])

  const signChallenge = async (id: string, challenge: string) => {
    const signedChallenge = await biometricCryptoAPI.signWithBiometricKey(challenge)
    await networkAPI.signVcChallenge(id, signedChallenge)
  }

  React.useEffect(() => {
    const effect = async () => {
      const VCs = await networkAPI.getAllMyVCs()

      const VCsDetails = await Promise.all(
        VCs.map(async (vc: any) => {
          const result = await networkAPI.getVcChallenge(vc.id)
          return { ...result, ...vc }
        })
      )

      setDocuments(VCsDetails)

      console.log(VCsDetails)
    }

    effect()
  }, [])

  return (
    <Layout style={styles.container}>
      <List
        style={{ backgroundColor: 'white' }}
        data={documents}
        renderItem={(props) => <DocumentCard {...props} onSign={signChallenge} />}
      />
    </Layout>
  )
}

const DocumentCard = ({ item, onSign }: any) => {
  const { data, status, id, challenge } = item

  const signed = status !== 'AWAITING_SIGNATURE'

  const handleSign = () => {
    onSign(id, challenge)
  }

  return (
    <Card status="basic">
      <DataItem label="Продавец" info={data?.seller?.FIO} />
      <DataItem label="Продавец" info={data?.buyer?.FIO} />
      <DataItem label="Цена" info={data?.price} />
      <DataItem label="Товар" info={data?.productName} />
      <DataItem label="Статус" info={<DocStatus signed={signed} />} />

      {!signed && <Button onPress={handleSign}>Подписать</Button>}
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
