import express from 'express'
import { bookMovie, deleteBooking, getBookinById } from '../controller/bookingController.js'

const router = express.Router()


router
    .post("/", bookMovie)
    .get("/:id", getBookinById)
    .delete("/:id", deleteBooking)

export default router