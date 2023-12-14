import Cookies from 'js-cookie'

export const requests = async (path: string, method: string, values?: object, auth?: boolean) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`
  const token = Cookies.get('authToken')

  const headers = {
    'Content-Type': 'application/json',
    Authorization: auth ? `Bearer ${token}` : ''
  }
  const options = {
    method: method,
    headers: headers,
    body: JSON.stringify(values)
  }
  try {
    const res = await fetch(url, options)
    const data = await res.json()
    return data
  } catch (err) {
    return console.error(err)
  }
}
