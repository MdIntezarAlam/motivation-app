import express from 'express'
import { deleteUser, getAllUser, postUser, updateUser, loginUser, getBookingOfUser } from '../controller/userController.js'

const router = express.Router()


router
    .get("/", getAllUser)
    .post("/signup", postUser)
    .post("/login", loginUser)
    .put("/:id", updateUser)
    .delete("/:id", deleteUser)
    .get("/bookings/:id", getBookingOfUser)

export default router