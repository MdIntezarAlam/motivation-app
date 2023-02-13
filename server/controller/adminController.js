import Admin from "../module/adminModule.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



//signup admin
export const addAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(421).json({
                success: false,
                message: "All field is required"

            })
        }
        let admin = await Admin.findOne({ email })

        if (admin) {
            return res.status(422).json({
                success: false,
                message: "This Email is Already exist"

            })
        }
        admin = await new Admin({ email, password })

        await admin.save()
        return res.status(200).json({
            success: false,
            message: "admin added successfully",
            admin,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//login Admin
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "All field is required"
            })
        }


        let admin = await Admin.findOne({ email })

        if (admin) {
            const passwordMatch = await bcrypt.compare(password, admin.password)

            if (!passwordMatch) {
                return res.status(422).json({
                    success: false,
                    message: "password is not correct"
                })
            } else if (passwordMatch) {
                const token = jwt.sign({ id: admin._id }, "SECRETE_KEY", { expiresIn: "7d" })
                res.status(200).json({
                    success: true,
                    message: "admin Authenticated",
                    // admin,
                    token,
                    id: admin._id
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// get admin
export const getAdmin = async (req, res) => {
    try {
        const admin = await Admin.find()
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "admin not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "list of admin",
            admin
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}