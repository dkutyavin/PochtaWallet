import React from 'react'
import { View, StyleSheet } from 'react-native'
import { RegistrationScreenProps } from '../../types/navigation'
import { Layout, Text, Button } from '@ui-kitten/components'

export function Greetings(props: RegistrationScreenProps<'Greetings'>) {
  const handleClick = () => {
    props.navigation.push('Credentials')
  }

  return (
    <Layout style={styles.container}>
      <View style={styles.hero}>
        <Text category="h2" style={styles.text}>
          Добро пожаловать
        </Text>
      </View>

      <Text style={[styles.text, styles.info]}>Для дальнейшей работы необходима регистрация</Text>
      <Button onPress={handleClick}>Продолжить</Button>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    padding: 20,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
  },
  info: {
    marginBottom: 40,
  },
  text: {
    textAlign: 'center',
  },
})
