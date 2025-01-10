import mongoose from "mongoose"

const latestStatsSchema = new mongoose.Schema(
    {
        price : {
            type : Number,
            required : true,
        },

        marketCap : {
            type : Number,
            required : true
        },

        change24h : {
            type : Number,
            required : true
        }
    },
{timestamps : true})

const priceHistorySchema = new mongoose.Schema(
    {
        price : {
            type : Number,
            required : true
        }
    },
{timestamps : true})

const cryptoSchema = new mongoose.Schema(
    {
        coin : {
            type : String,
            required : true,
            unique : true
        },

        latestStats : {
            type : latestStatsSchema,
            required : true
        },

        priceHistory : {
            type : [priceHistorySchema],
            required : true
        }
    },
    {timestamps : true}
)

cryptoSchema.pre("save", function (next){
    if (this.priceHistory.length > 100) {
        this.priceHistory = this.priceHistory.slice(-100)
    }
    next()
})

export default Crypto = mongoose.model("Crypto", cryptoSchema)