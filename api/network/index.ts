import { AUTH_SECRET, PUBLIC_KEY } from './config'
import { AUTH_URL, ISSUE_DID_URL, ACTIVATE_DID_URL } from './endpoints'
import { fetcher, fetchHandler } from './fetcher'

let jwt: string

export async function issueDID(user: any) {
  const res = await fetcher.post(ISSUE_DID_URL, { ...user, publicKey: PUBLIC_KEY })
  return res
}

export async function activateDID(signedChallenge: string, activationCode: string) {
  const data = await fetcher.post(ACTIVATE_DID_URL, {
    activationCode,
    publicKey: PUBLIC_KEY,
    signedChallenge,
  })

  return data
}

export async function login(username: string, password: string) {
  const response = await fetchHandler(
    AUTH_URL,
    { username, password, grant_type: 'password' },
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${AUTH_SECRET}`,
      },
    }
  )

  // jwt = response.access_token
  // console.log({ jwt })
}
