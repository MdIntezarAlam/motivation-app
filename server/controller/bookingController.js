import mongoose from "mongoose";
import Booking from "../module/bookingModule.js"
import Movie from "../module/movieModule.js";
import User from "../module/userModule.js";


export const bookMovie = async (req, res) => {

    const { user, movie, seatNumber, date } = req.body

    if (!user || !movie || !seatNumber || !date) {
        return res.status(422).json({
            success: false,
            messge: "All Field is required"
        })
    }

    let existingMovie;
    let existingUser;
    try {
        existingMovie = await Movie.findById(movie)
        existingUser = await User.findById(user)
    } catch (error) {
        return console.log(error)
    }

    //2:37
    if (!existingMovie) {
        return res.status(404).json({
            success: false,
            messge: "movie not found with givien id",
        })
    }
    if (!existingUser) {
        return res.status(404).json({
            success: false,
            messge: "user  not found with givien id",
        })
    }

    let booking;
    try {
        booking = new Booking({ user, movie, seatNumber, date: new Date(`${date}`) })

        const session = await mongoose.startSession()
        session.startTransaction()
        existingUser.bookings.push(booking);
        existingMovie.bookings.push(booking)
        await existingUser.save({ session })
        await existingMovie.save({ session })
        await booking.save({ session })
        session.commitTransaction()
    } catch (error) {
        return console.log("booking error", error)
    }

    if (!booking) {
        return res.status(500).json({
            success: false,
            messge: "unable to create booking",
        })
    }
    // await newbook.save()
    return res.status(201).json({
        success: true,
        messge: "booking created",
        booking
    })



}

//get movie by id
export const getBookinById = async (req, res) => {
    try {
        const id = req.params.id
        const booking = await Booking.findById(id)
        if (!booking) {
            return res.status(404).json({
                success: false,
                messge: "booking not found with this id",
            })
        }
        return res.status(200).json({
            success: true,
            messge: "list of booking is..",
            booking
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            messge: error.messge
        })
    }
}
//delete all movie
export const deleteBooking = async (req, res) => {
    const id = req.params.id
    let booking;

    try {
        booking = await Booking.findByIdAndRemove(id).populate("user movie")//

        const session = await mongoose.startSession()
        session.startTransaction()
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking)
        await booking.movie.save({ session })
        await booking.user.save({ session })
        await booking.save({ session })
        session.commitTransaction()

    } catch (error) {
        console.log(error);
    }

    if (!booking) {
        return res.status(404).json({
            success: false,
            messge: "unable to delete "
        })
    }
    return res.status(200).json({
        success: true,
        messge: " deleted successfully "
    })


}