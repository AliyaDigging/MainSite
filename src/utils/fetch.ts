import { Axios } from 'axios'

export async function getJson<Response>(url: string, retryTimes: number = 5) {
  const client = new Axios()

  let i = 0
  while (i < retryTimes) {
    try {
      const req = await client.get<Response>(url)
      return JSON.parse(String(req.data))
    } catch (e) {
      console.log(`Requesting URL "${url}" (count ${i}), but got error: ${e}`)
    }

    i = i + 1
  }
}
