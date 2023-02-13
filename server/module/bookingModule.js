import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },

    seatNumber: {
        type: Number,
        trim: true,
        required: true,
    },

    date: {
        type: Date, required: true
    },

})

const Booking = new mongoose.model("Booking", bookingSchema)

export default Booking