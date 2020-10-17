import { ec as EC } from 'elliptic'
import * as Crypto from 'expo-crypto'
import { Buffer } from 'buffer'
import * as storageAPI from '../storage'

const ec = new EC('secp256k1')

/**
 * generate keys and returns the pupblic key in base64 format
 */
export async function generatePublicKey() {
  const key = ec.genKeyPair()
  await saveKeyToStore(key)
  return getPublicKeyInBase64()
}

export async function signMessage(message: string) {
  const key = await excludeKeyFromStore()
  const msgHash = await getHashedBufferOfString(message)
  const signature = key.sign(msgHash)

  return Buffer.from(signature.toDER()).toString('base64')
}

function getHashedBufferOfString(str: string) {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, str)
}

async function getPublicKeyInBase64() {
  const key = await excludeKeyFromStore()

  const PREFIX = '3056301006072a8648ce3d020106052b8104000a034200'
  const publicKeyInHex = key.getPublic().encode('hex', false)

  return Buffer.from(`${PREFIX}${publicKeyInHex}`, 'hex').toString('base64')
}

async function excludeKeyFromStore() {
  const priKeyHex = await storageAPI.getKey()
  const key = ec.keyFromPrivate(priKeyHex)

  return key
}

async function saveKeyToStore(key: EC.KeyPair) {
  const priKeyHex = key.getPrivate().toString('hex')
  await storageAPI.saveKey(priKeyHex)
}
