/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config'
import { Soundcloud, API, Me } from 'soundcloud.ts'

export async function useAPI() {
  const soundcloud = new Soundcloud(
    process.env.SOUNDCLOUD_CLIENT_ID,
    process.env.SOUNDCLOUD_OAUTH_TOKEN
  )
  const me = soundcloud.me.getV2()
  // const genericWebClientID = await soundcloud.api.getClientIdWeb()
  // const api = new API(SOUNDCLOUD_CLIENT_ID, SOUNDCLOUD_OAUTH_TOKEN)

  console.log(await me)
}

useAPI()
