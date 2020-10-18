import * as React from 'react'
import { View } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import { Group } from '.'
import * as biometricCryptoAPI from '../../../../api/biometricCrypto'

export function SignInfo() {
  const publicKey = usePublicKey()

  if (publicKey.isLoading) return null

  return (
    <Group title="Информация о подписи">
      <DataItem label="Публичный ключ" info={publicKey.key} />
      <DataItem label="Приватный ключ" info={<PrivateInfo />} />
    </Group>
  )
}

function PrivateInfo() {
  const privateKey = usePrivateKey()
  if (privateKey.status !== 'ready') {
    return (
      <Button
        onPress={privateKey.showPrivateKey}
        style={{ marginTop: 5 }}
        size="small"
        status="basic"
      >
        Показать
      </Button>
    )
  }

  return (
    <View>
      <Button
        onPress={privateKey.hidePrivateKey}
        style={{ marginTop: 5 }}
        size="small"
        appearance="outline"
        status="basic"
      >
        Скрыть
      </Button>
      <Text style={{ fontSize: 12 }}>{privateKey.privateKey || '--'}</Text>
    </View>
  )
}

export function DataItem({ label, info }: { label: string; info: any }) {
  return (
    <View style={{ justifyContent: 'space-between', marginBottom: 10 }}>
      <Text style={{ color: '#858585', fontSize: 18, fontWeight: '300' }}>{label}</Text>
      {typeof info === 'string' ? <Text style={{ fontSize: 12 }}>{info || '--'}</Text> : info}
    </View>
  )
}

function usePublicKey() {
  const [status, setStatus] = React.useState<Status>('reading')
  const [key, setKey] = React.useState('')

  React.useEffect(() => {
    const showPublicEffect = async () => {
      try {
        const publicKey = await biometricCryptoAPI.getPublicKey()
        setKey(publicKey)
        setStatus('ready')
      } catch (error) {
        console.warn(error)
        setStatus('error')
      }
    }

    showPublicEffect()
  }, [])

  return { isLoading: status === 'reading', key }
}

function usePrivateKey() {
  const [status, setStatus] = React.useState<Status>('idle')
  const [privateKey, setPrivateKey] = React.useState('')
  const showPrivateKey = async () => {
    setStatus('reading')

    try {
      const key = await biometricCryptoAPI.getPrivateKey()
      setPrivateKey(key)
      setStatus('ready')
    } catch (error) {
      console.warn(error)
      setStatus('error')
    }
  }

  const hidePrivateKey = async () => {
    setStatus('idle')
    setPrivateKey('')
  }

  return {
    privateKey,
    status,
    showPrivateKey,
    hidePrivateKey,
  }
}

type Status = 'reading' | 'ready' | 'error' | 'idle'
