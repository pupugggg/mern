const mongoose = require('mongoose')
//define how to connect to MongoDB.
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline)
    } catch {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB