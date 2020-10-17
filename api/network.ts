type User = {
  login: string
  publicKey: string
  biometricPublicKey: string
  password: string
  phoneNumber: string
  firstName: string
  patronymic: string
  lastName: string
}

const baseURL = 'https://deals.weintegrator.com/api/v0/deals-webapp-app'

export async function issueDID(user: any) {
  const res = await fetch(`${baseURL}/public/did/issue`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...user, publicKey: '3FqDhAXdEYyc49roUhVqgR8ZRqCtwf4eE1U' }),
  })

  const data = await res.json()

  return data
}

export async function activateDID(signedChallenge: string, activationCode: string) {
  const res = await fetch(`${baseURL}/public/did/activate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      activationCode,
      publicKey: '3FqDhAXdEYyc49roUhVqgR8ZRqCtwf4eE1U',
      signedChallenge,
    }),
  })

  const data = res.json()
  return data
}


export async function login() {
  
}