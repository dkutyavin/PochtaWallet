import * as biometricAPI from './biometric'
import * as cryptoAPI from './crypto'

export async function getPublicKeyWithBiometric() {
  try {
    await biometricAPI.auth({ promptMessage: 'Создать ключ' })
    const key = cryptoAPI.generatePublicKey()
    return key
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function signWithBiometricKey(message: string) {
  try {
    await biometricAPI.auth({ promptMessage: 'Подписать данные' })
    const sign = cryptoAPI.signMessage(message)
    return sign
  } catch (error) {
    console.log(error)
    throw error
  }
}
