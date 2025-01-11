import fetch from 'node-fetch';
import cron from "node-cron"
import Crypto from "../models/crypto.model.js"
import {ApiError} from "../utils/ApiError.js"

const fetchCryptoData = async () => {
    try {

        console.log(process.env.COINGECKO_API_KEY)
        
        const coins = [`bitcoin`, `matic-network`, `ethereum`]

        for (const coin of coins) {

            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-cg-demo-api-key': process.env.COINGECKO_API_KEY,
                },
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch data for ${coin}: ${response.statusText}`)
            }

            const data = await response.json();
            const { current_price, market_cap, price_change_percentage_24h } = data.market_data

            const latestStats = {
                price: current_price.usd,
                marketCap: market_cap.usd,
                change24h: price_change_percentage_24h,
            };

            let crypto = await Crypto.findOne({ coin })

            if (!crypto) {
                crypto = new Crypto({
                    coin,
                    latestStats,
                    priceHistory: [{ price: current_price.usd }],
                })
            } else {
                crypto.latestStats = latestStats
                crypto.priceHistory.push({ price: current_price.usd })
            }

            await crypto.save()

            console.log(`${coin} details fetched from coingecko`)
        }
        
    } catch (error) {
        throw new ApiError (500, `Error fetching crypto data: ${error}`)
    }
}

cron.schedule('* * * * *', fetchCryptoData)

export { fetchCryptoData }
