import { AUTH_SECRET, PUBLIC_KEY } from './config'
import {
  AUTH_URL,
  ISSUE_DID_URL,
  ACTIVATE_DID_URL,
  VC_URL,
  VC_DETAILS,
  VC_CHALLENGE,
  VC_SIGN_CHALLENGE,
} from './endpoints'
import { fetcher, fetchHandler } from './fetcher'
import * as storageAPI from '../storage'

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

  storageAPI.setToken(response.access_token)
}

export function getAllMyVCs() {
  return fetcher.get(VC_URL)
}

export function getVcDetails(id: string) {
  return fetcher.get(VC_DETAILS(id))
}

export function getVcChallenge(id: string) {
  return fetcher.get(VC_CHALLENGE(id))
}

export function signVcChallenge(id: string, signedChallenge: string) {
  return fetcher.post(VC_SIGN_CHALLENGE(id), { signedChallenge }, true)
}
