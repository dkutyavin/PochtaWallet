const HOST_URL = 'https://deals.weintegrator.com'

const DEALS_URL = `${HOST_URL}/api/v0/deals-webapp-app`

export const AUTH_URL = `${HOST_URL}/api/v0/vst-oauth2/oauth/token`

export const ISSUE_DID_URL = `${DEALS_URL}/public/did/issue`
export const ACTIVATE_DID_URL = `${DEALS_URL}/public/did/activate`
export const VC_URL = `${DEALS_URL}/vc`
export const VC_DETAILS = (id: string) => `${VC_URL}/${id}`
export const VC_CHALLENGE = (id: string) => `${VC_DETAILS(id)}/challenge`
export const VC_SIGN_CHALLENGE = (id: string) => `${VC_DETAILS(id)}/sign`
