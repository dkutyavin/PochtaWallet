import React from 'react'
import { Layout, Text, Button, Select, SelectItem } from '@ui-kitten/components'
import { useForm } from 'react-hook-form'

import { View, StyleSheet, ScrollView } from 'react-native'
import { useAppState } from '../../app/state'
import { Input } from '../../components/Input'
import { RegistrationScreenProps } from '../../types/navigation'
import * as networkAPI from '../../api/network'
import * as biometricCryptoAPI from '../../api/biometricCrypto'

export function UserInfo(props: RegistrationScreenProps<'Greetings'>) {
  const { control, handleSubmit, errors } = useForm()
  const { saveToUser, user } = useAppState()

  const onSubmit = async (data: Record<string, string>) => {
    const biometricPublicKey = await biometricCryptoAPI.getPublicKeyWithBiometric()

    const newUser = { ...user, ...data, biometricPublicKey }
    const result = await networkAPI.issueDID(newUser)

    console.log({ newUser, result })

    saveToUser({ ...data, challenge: result.challenge })

    props.navigation.push('PhoneVerify')
  }

  return (
    <Layout style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 32, paddingVertical: 20 }}>
          <View style={styles.form}>
            <Text category="h4" style={styles.hero}>
              Верификация DID
            </Text>

            <Input
              label="Номер телефона"
              control={control}
              name="phoneNumber"
              rules={{ required: true }}
              error={errors.phoneNumber && 'Поле обязательно к заполнению'}
            />

            <Input
              control={control}
              name="lastName"
              label="Фамилия"
              rules={{ required: true }}
              error={errors.lastName && 'Поле обязательно к заполнению'}
            />

            <Input
              control={control}
              name="firstName"
              label="Имя"
              rules={{ required: true }}
              error={errors.firstName && 'Поле обязательно к заполнению'}
            />

            <Input
              control={control}
              name="patronymic"
              label="Отчество"
              rules={{ required: true }}
              error={errors.patronymic && 'Поле обязательно к заполнению'}
            />

            <Input
              multiline={true}
              textStyle={{ minHeight: 64 }}
              control={control}
              name="otherInfo"
              label="О себе"
            />

            <Select
              label="Верификатор"
              value={(props) => <Text {...props}>Почта России</Text>}
              disabled
            >
              <SelectItem title={(props) => <Text {...props}>Почта России</Text>} />
            </Select>
          </View>

          <View style={styles.button}>
            <Button onPress={handleSubmit(onSubmit)}>Сохранить биометрическую подпись</Button>
          </View>
        </View>
      </ScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  hero: {
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 40,
  },
  button: {
    marginTop: 20,
    justifyContent: 'flex-end',
  },
})
