import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: 6
    },
    adddMovies: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Movie"
        }
    ]
})


// adminSchema.methods.adminToken = async function () {
//     try {
//         const token = await jwt.sign({ _id: this._id, }, "EXPIRE_KEY83573453234234@#$@#$2", { expiresIn: "1d" })
//         this.tokens = this.tokens.concat({ token })
//         await this.save()
//         return token
//     } catch (error) {
//         console.log("token error", error);
//     }
// }


const saltRound = 10
adminSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, saltRound)
    }
    next()
})


const Admin = new mongoose.model("Admin", adminSchema)

export default Admin