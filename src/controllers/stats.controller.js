import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import Crypto from "../models/crypto.model.js"

const getStats = asyncHandler (async (req, res) => {
    try {
        
        const {coin} = req.query
        const cryptoData = await Crypto.findOne({coin})

        if (!cryptoData) {
            throw new ApiError (404, `No stats found for ${coin}`)
        }

        // console.log(cryptoData)

        return res.status(200)
        .json( new ApiResponse (200, cryptoData, "stats fetched successfully") )

    } catch (error) {
        throw new ApiError (500, `error while getting stats: ${error}`)
    }
})

export {getStats}