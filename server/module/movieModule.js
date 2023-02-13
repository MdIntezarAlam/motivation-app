import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    actors: [{
        type: String,
        trim: true,
        required: true
    }],
    releaseDate: {
        type: Date,
        trim: true,
        required: true,
    },
    posterUrl: {
        type: String,
        trim: true,
        required: true,
    },
    featured: {
        type: Boolean
    },
    bookings: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Booking"
        }
    ],
    // only admin can post movie
    admin: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
})

const Movie = new mongoose.model("Movie", movieSchema)

export default Movie