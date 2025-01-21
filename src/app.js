import {fetchCryptoData} from"./jobs/crypto.job.js"
import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.urlencoded({extended: true , limit: "16kb"}))

fetchCryptoData() // this is the scheduled task

import healthCheckRouter from "./routes/healthcheck.route.js"
import statsRouter from "./routes/stats.route.js"
import deviationRouter from "./routes/deviation.route.js"

app.use("/api/v1/healthcheck", healthCheckRouter) //tested
app.use("/api/v1/stats", statsRouter) //tested
app.use("/api/v1/deviation", deviationRouter) //tested

export {app}