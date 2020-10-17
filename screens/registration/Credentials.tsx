import React from 'react'
import { Layout, Text, Button } from '@ui-kitten/components'
import { useForm } from 'react-hook-form'

import { View, StyleSheet } from 'react-native'
import { useAppState } from '../../app/state'
import { Input, InputPassword } from '../../components/Input'
import { RegistrationScreenProps } from '../../types/navigation'

export function Credentials(props: RegistrationScreenProps<'Credentials'>) {
  const { control, handleSubmit, errors } = useForm()
  const { saveToUser } = useAppState()

  const onSubmit = (data: Record<string, string>) => {
    saveToUser(data)
    props.navigation.push('UserInfo')
  }

  return (
    <Layout style={styles.container}>
      <View style={styles.form}>
        <Text category="h5" style={styles.hero}>
          Создание децентрализованного ID
        </Text>

        <Input
          size="large"
          control={control}
          name="login"
          label="Логин"
          rules={{ required: true }}
          error={errors.login && 'Поле обязательно к заполнению'}
        />

        <InputPassword
          size="large"
          control={control}
          name="password"
          label="Пароль"
          rules={{ required: true }}
          error={errors.password && 'Поле обязательно к заполнению'}
        />
      </View>

      <View style={styles.button}>
        <Button onPress={handleSubmit(onSubmit)}>Продолжить</Button>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  hero: {
    textAlign: 'center',
    marginTop: 140,
    marginBottom: 40,
  },
  button: {
    justifyContent: 'flex-end',
  },
})
