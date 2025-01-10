import {fetchCryptoData} from"./jobs/crypto.job.js"
import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.urlencoded({extended: true , limit: "16kb"}))

fetchCryptoData()

import {getStats} from "./controllers/stats.controller.js"
import {getDeviation} from "./controllers/deviation.controller.js"

app.get("/stats", getStats)
app.get("/deviation", getDeviation)

export {app}