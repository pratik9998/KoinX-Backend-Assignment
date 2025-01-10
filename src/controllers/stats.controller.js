import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import Crypto from "../models/crypto.model.js"

const getStats = asyncHandler (async (req, res) => {

    try {
        
        const {coin} = req.query
        const cryptoData = await Crypto.findOne({coin})

        if (!cryptoData) {
            throw new ApiError (404, `No stats found for ${coin}`)
        }

        // console.log(cryptoData)

        const responseData = {
            price : cryptoData.latestStats.price,
            marketCap : cryptoData.latestStats.marketCap,
            "24hChange" : cryptoData.latestStats.change24h,
        }

        return res.status(200).json( responseData )

    } catch (error) {
        throw new ApiError (500, `error while getting stats: ${error}`)
    }
})

export {getStats}