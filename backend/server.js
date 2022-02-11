const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.port || 5000
connectDB()
//  initialize server.
const app = express()
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
