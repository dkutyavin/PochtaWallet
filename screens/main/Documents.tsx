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
      <Text
        style={{
          fontWeight: '700',
          fontSize: 28,
          marginBottom: 20,
          marginTop: 40,
          color: '#858585',
        }}
      >
        Доступные документы
      </Text>

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

  const buyer = data.buyer.FIO
  const seller = data.seller.FIO

  const isToSign = status === 'AWAITING_SIGNATURE'

  const handleSign = () => {
    onSign(id, challenge)
  }

  return (
    <Card status="basic">
      <Text>Продавец {seller}</Text>
      <Text>Покупатель {buyer}</Text>
      <Text>Цена {data.price}</Text>
      <Text>Товар {data.productName}</Text>
      <Text>Статус {isToSign ? 'Ожидает подписи' : 'Подписан'}</Text>

      {isToSign && <Button onPress={handleSign}>Подписать</Button>}
    </Card>
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
