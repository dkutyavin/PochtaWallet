import { ec as EC } from 'elliptic'
import * as Crypto from 'expo-crypto'
import { Buffer } from 'buffer'

const ec = new EC('secp256k1')

let key: EC.KeyPair

/**
 * generate keys and returns the pupblic key in base64 format
 */
export function generatePublicKey() {
  generateKeys()
  return getPublicKeyInBase64()
}

export async function signMessage(message: string) {
  const msgHash = await getHashedBufferOfString(message)
  const signature = key.sign(msgHash)

  return Buffer.from(signature.toDER()).toString('base64')
}

function generateKeys() {
  key = ec.genKeyPair()
}

function getHashedBufferOfString(str: string) {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, str)
}

function getPublicKeyInBase64() {
  const PREFIX = '3056301006072a8648ce3d020106052b8104000a034200'
  const publicKeyInHex = key.getPublic().encode('hex', false)

  return Buffer.from(`${PREFIX}${publicKeyInHex}`, 'hex').toString('base64')
}
