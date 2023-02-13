import express from 'express'
import dotenv from 'dotenv'
import connectDatabse from './database/Db.js'
import userRouter from './router/userRouter.js'
import adminRouter from './router/adminRouter.js'
import movieRouter from './router/movieRouter.js'
import bookingRouter from './router/bookingRouter.js'
const app = express()
app.use(express.json())

dotenv.config({ path: "config/.env" })
app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/movie", movieRouter)
app.use("/booking", bookingRouter)

app.listen(process.env.PORT, () => {
    console.log(`server is on localhost ${process.env.PORT}`);
})
connectDatabse()