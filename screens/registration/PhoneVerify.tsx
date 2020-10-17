import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { RegistrationScreenProps } from '../../types/navigation'
import { Input } from '../../components/Input'
import { useAppState } from '../../app/state'
import { Layout, Text, Button, Spinner } from '@ui-kitten/components'
import * as storageAPI from '../../api/storage'

import * as networkAPI from '../../api/network'
import * as biometricCryptoAPI from '../../api/biometricCrypto'

export function PhoneVerify(props: RegistrationScreenProps<'PhoneVerify'>) {
  const { register, user, saveToUser } = useAppState()
  const [status, setStatus] = React.useState('idle')

  const { control, handleSubmit, errors } = useForm()

  const onSubmit = async (data: Record<string, string>) => {
    const signedChallenge = await biometricCryptoAPI.signWithBiometricKey(user.challenge)

    setStatus('loading')

    const passport = await networkAPI.activateDID(signedChallenge, data.code)

    saveToUser({ response: passport })

    await networkAPI.login(user.login, user.password)

    storageAPI.setVC(passport)

    register()
  }

  if (status === 'loading') {
    return (
      <Layout style={[styles.contatainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <Spinner size="giant" />
      </Layout>
    )
  }

  return (
    <Layout style={styles.contatainer}>
      <View style={styles.hero}>
        <Text style={{ textAlign: 'center' }} category="h3">
          Почти готово!
        </Text>

        <Text category="h5" style={{ textAlign: 'center', marginTop: 40 }}>
          Введите код из СМС
        </Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Проверочный код"
          control={control}
          name="code"
          rules={{ required: true }}
          error={errors.code && 'Поле обязательно к заполнению'}
        />
      </View>

      <Button onPress={handleSubmit(onSubmit)}>Подтвердить</Button>
    </Layout>
  )
}

const styles = StyleSheet.create({
  contatainer: {
    flex: 1,
    padding: 20,
  },
  form: {
    flex: 1,
    marginTop: 100,
    marginBottom: 100,
  },
  hero: {
    marginTop: 100,
  },
})
