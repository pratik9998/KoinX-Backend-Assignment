import { Router } from "express"
import {healthCheck} from "../controllers/healthcheck.controller.js"

const router = Router()

router.route("/").post(healthCheck)

export default router