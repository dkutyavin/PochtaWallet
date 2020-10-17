import AsyncStore from '@react-native-community/async-storage'

export function getToken() {
  return AsyncStore.getItem('token') as Promise<string>
}

export function setToken(token: string) {
  return AsyncStore.setItem('token', token)
}

export function saveKey(key: string) {
  return AsyncStore.setItem('key', key)
}

export function getKey() {
  return AsyncStore.getItem('key') as Promise<string>
}

export async function getVC() {
  const passportJSON = (await AsyncStore.getItem('passport')) as string
  return JSON.parse(passportJSON)
}

export function setVC(vc: any) {
  return AsyncStore.setItem('passport', JSON.stringify(vc))
}

export function setUser(user: any) {
  return AsyncStore.setItem('user', JSON.stringify(user))
}

export function getUser() {
  return AsyncStore.getItem('user')
}

export function clear() {
  return AsyncStore.multiRemove(['token', 'key', 'passport'])
}
