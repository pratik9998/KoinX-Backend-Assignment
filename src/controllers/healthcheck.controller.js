import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const healthCheck = asyncHandler ( async (req, res) => {
    try {
        return res.status(201).json(new ApiResponse (201, {}, "ok, server is listening"))
    } catch (error) {
        throw new ApiError (500, `health check error: ${error}`)
    }
})

export {healthCheck}