import { Router } from "express"
import {getDeviation} from "../controllers/deviation.controller.js"

const router = Router()

router.route("/").get(getDeviation)

export default router