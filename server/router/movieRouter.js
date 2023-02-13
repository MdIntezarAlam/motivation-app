import express from 'express'
import { addMovie, getAllMovie, getMovieById } from '../controller/movieController.js'

const router = express.Router()


router
    .post("/", addMovie)
    .get("/", getAllMovie)
    .get("/:id", getMovieById)

export default router