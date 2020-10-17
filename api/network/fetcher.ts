import * as storageAPI from '../storage'

export const fetcher = {
  get: (url: string) => fetchHandler(url, undefined, { method: 'GET' }),
  post: (url: string, body?: Record<string, any>, noData = false) =>
    fetchHandler(url, body, { method: 'POST' }, noData),
}

export async function fetchHandler(
  url: string,
  requestBody?: Record<string, any>,
  options?: RequestInit,
  noData = false
) {
  const body = requestBody ? JSON.stringify(requestBody) : undefined

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  const token = await storageAPI.getToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const requestOptions = {
    headers,
    body,
    ...options,
  }

  const response = await fetch(url, requestOptions)

  if (!response.ok) {
    const data = await response.json()
    console.log({ url, message: data?.message, token, body })
    throw new Error(data?.message)
  }

  if (noData) return response

  const data = await response.json()

  return data
}
