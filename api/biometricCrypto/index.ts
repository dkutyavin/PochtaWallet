import * as biometricAPI from './biometric'
import * as cryptoAPI from './crypto'
import * as storeAPI from '../storage'

export async function generatePublicKeyWithBiometric() {
  try {
    await biometricAPI.auth({ promptMessage: 'Создать ключ' })
    const key = await cryptoAPI.generatePublicKey()
    return key
  } catch (error) {
    console.warn(error)
    throw error
  }
}

export async function signWithBiometricKey(message: string) {
  try {
    await biometricAPI.auth({ promptMessage: 'Подписать данные' })
    const sign = cryptoAPI.signMessage(message)
    return sign
  } catch (error) {
    console.warn(error)
    throw error
  }
}

export async function getPublicKey() {
  return cryptoAPI.getPublicKeyInBase64()
}

export async function getPrivateKey() {
  await biometricAPI.auth({ promptMessage: 'Показать данные' })
  const key = await storeAPI.getKey()
  return key
}
