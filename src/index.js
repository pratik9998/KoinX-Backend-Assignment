import dotenv from "dotenv"
import connectDB from "./db/db.connection.js"
import {app} from "./app.js"

dotenv.config()

connectDB()
.then( () => {
    app.listen(process.env.PORT || 8000 , () => {
        console.log(`server is running on port ${process.env.PORT}`)
    })
})
.catch( (err) => {
    console.error("MongoDb connection error: ", err)
})

