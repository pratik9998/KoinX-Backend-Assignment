import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {std} from "mathjs"
import Crypto from "../models/crypto.model.js"

const getDeviation = asyncHandler (async (req, res) => {
    try {
        
        const {coin} = req.query
        const cryptoData = await Crypto.findOne({coin})

        if (!cryptoData) {
            throw new ApiError (404, `Data not found for ${coin}`)
        }

        // console.log(cryptoData)

        const prices = cryptoData.priceHistory.slice(-100).map(data => data.price)
        const deviation = std(prices)

        const responseData = {
            deviation : deviation
        }

        return res.status(200).json( responseData )

    } catch (error) {
        throw new ApiError (500, `error while getting deviation details: ${error}`)
    }
})

export {getDeviation}