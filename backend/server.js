const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')
const port = process.env.port || 5000
connectDB()
//  initialize server.
const app = express()
//  allow cors
const corsWhitlist = ['http://localhost:3000']
// const corsOptions = {
//     origin: function (origin, callback) {
//       if (!origin || whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//       } else {
//         callback(new Error("Not allowed by CORS"))
//       }
//     },
//     credentials: true,
//   }
// app.use(cors(corsOptions))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//  apply middleware in order to parsing http body by json and urlencoded.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//  Set the route of the server
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

//  Overwrite the default error handler so that server won't respond a html file to show the error.
app.use(errorHandler)

//  start the server
app.listen(port, () => console.log(`server started on port ${port}`))
