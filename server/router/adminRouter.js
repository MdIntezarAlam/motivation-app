import express from 'express'
import { addAdmin, getAdmin, loginAdmin } from '../controller/adminController.js'

const router = express.Router()


router
    .post("/signup", addAdmin)
    .post("/login", loginAdmin)
    .get("/", getAdmin)

export default router