import express from 'express'
import { getPayloadClient } from './get-payloads'
import { nextApp, nextHandler } from './app/next-app'


const app = express()

const PORT = Number(process.env.PORT) || 3000

const start = async () => {
    const payload = await getPayloadClient({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`Admin URl ${cms.getAdminURL()}`)
            }
        }
    })

    app.use((req, res) => nextHandler(req, res))
    nextApp.prepare().then(() => {
        payload.logger.info("Nextjs Started")
    })

    app.listen(PORT, async () => {
        payload.logger.info(`NextJs public URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
    } )
}

start()