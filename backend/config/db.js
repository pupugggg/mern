const mongoose = require('mongoose')
//define how to connect to MongoDB.
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        
        console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline)
    } catch(error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB