const mongoose = require("mongoose") 


exports.dbcon = async () => {
    // console.log(process.env.MONGO_URL);
    try {
        const dbUrl= process.env.MONGO_URL
        const con = await mongoose.connect(dbUrl)

        console.log(`Mongo DB connected :${con.connection.host}`)
    } catch (error) {
        console.log("db failed");
        console.log(error.message)
        process.exit(1)
    }
}