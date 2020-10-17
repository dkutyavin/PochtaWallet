import * as LocalAuthentication from 'expo-local-authentication'

export async function auth(options: LocalAuthentication.LocalAuthenticationOptions = {}) {
  const { success } = await LocalAuthentication.authenticateAsync(options)

  if (!success) throw new Error('Biometric authentication error')
}
