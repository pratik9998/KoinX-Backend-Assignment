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
import {healthCheck} from "./controllers/healthcheck.controller.js"

app.get("/stats", getStats) //tested
app.get("/deviation", getDeviation) //tested
app.post("/healthcheck", healthCheck) //tested

export {app}