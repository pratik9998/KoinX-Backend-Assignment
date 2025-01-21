import { Router } from "express"
import {getStats} from "../controllers/stats.controller.js"

const router = Router()

router.route("/").get(getStats)

export default router