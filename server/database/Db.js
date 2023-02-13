import mongoose from "mongoose";

mongoose.set('strictQuery', true)
const connectDatabse = async () => {
    const DB = "mongodb+srv://intezar:i1t2e3z4@cluster0.bymrpox.mongodb.net/movie-app"
    // const DB = `mongodb+srv://intezar:${process.env.DBPASS}@cluster0.bymrpox.mongodb.net/?retryWrites=true&w=majority`
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        // console.log(`database is connected on ${DB}`)
        console.log(`database is connected on ${process.env.DB}`)
    } catch (error) {
        console.log("database error=>>>>>>>>>>>>", error);
    }
}
export default connectDatabse


// import mongoose from "mongoose";
// mongoose.set('strictQuery', true)

// export const connectDatabse = async () => {

//     // const url = `mongodb+srv://sample_user:<password>@my-sample-cluster-b3ugy.mongodb.net/<dbname>?retryWrites=true&w=majority`;
//     const DB = `mongodb+srv://intezar:Kl9pYDdCMxtsCkAc@cluster0.bymrpox.mongodb.net/?retryWrites=true&w=majority`

//     const connectionParams = {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
//     mongoose.connect(DB, connectionParams)
//         .then((res) => {
//             console.log('Connected to database ', res)
//         })
//         .catch((err) => {
//             console.error("Error connecting to the database", err);
//         })
// }
// export default connectDatabse