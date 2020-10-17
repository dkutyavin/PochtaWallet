export const fetcher = {
  get: (url: string) => fetchHandler(url, undefined, { method: 'GET' }),
  post: (url: string, body?: Record<string, any>) => fetchHandler(url, body, { method: 'POST' }),
}

export async function fetchHandler(
  url: string,
  requestBody?: Record<string, any>,
  options?: RequestInit
) {
  const body = requestBody ? JSON.stringify(requestBody) : undefined

  const headers = {
    'Content-Type': 'application/json',
  }

  const requestOptions = {
    headers,
    body,
    ...options,
  }

  console.log(requestOptions)

  const response = await fetch(url, requestOptions)

  {
    console.log(response)
  }
  const data = await response.json()

  console.log({ data })

  if (!response.ok) throw new Error(data?.message)

  return data
}
