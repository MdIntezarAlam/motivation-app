import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Movie from "../module/movieModule.js";
import Admin from '../module/adminModule.js'

//post all movie noly admin
export const addMovie = async (req, res) => {
    //vryfying token  
    const token = req.headers.authorization.split(" ")[1];    //becouse we set token in authorization in postman
    //if token not found return err
    if (!token) {
        return res.status(404).json({
            message: "Token not found",
        })
    }
    // console.log("AuthenticatedTokens", token)  //check token 
    // verify token
    let adminId;
    jwt.verify(token, "SECRETE_KEY", (err, decrypted) => {
        if (err) {
            return res.status(404).json({
                message: err.message,
            })
        } else {
            adminId = decrypted.id
            return
        }
    });

    //after verifyed then create new movie.
    const { title, description, actors, releaseDate, posterUrl, featured, Booking } = req.body
    if (!title || !actors || !description || !releaseDate || !posterUrl || !featured || !Booking) {
        return res.status(422).json({
            success: false,
            message: "All field is required"
        })
    }

    let movie;
    try {
        movie = new Movie({
            title,
            actors,
            description,
            releaseDate: new Date(`${releaseDate}`),
            featured,
            posterUrl,
            admin: adminId,
        });

        const session = await mongoose.startSession()
        const adminUser = await Admin.findById(adminId)
        session.startTransaction();
        await movie.save({ session })
        adminUser.adddMovies.push(movie);
        await adminUser.save({ session })
        await session.commitTransaction()

        // movie = await movie.save()
    } catch (error) {
        return console.log(error)
    }

    if (!movie) {
        return res.status(500).json({
            message: "Req failed",
        })
    }

    return res.status(201).json({
        message: "movie added",
        movie
    })
}

//get all the movie
export const getAllMovie = async (req, res) => {
    try {
        const movie = await Movie.find()
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "movie not found"
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "list of movie",
                movie
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//get movie by id
export const getMovieById = async (req, res) => {
    try {
        const id = req.params.id
        const movie = await Movie.findById(id)
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "movie not found"
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "single movie of movie",
                movie
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
} 
