const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middlewares/errorMiddleware')
const port = process.env.port || 5000
//  initialize server.
const app = express()
//  apply middleware in order to parsing http body by json and urlencoded.
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//  Set the route of the server
app.use('/api/goals',require('./routes/goalRoutes'))

//  Overwrite the default error handler so that server won't respond a html file to show the error.
app.use(errorHandler)

//  start the server
app.listen(port,()=> console.log(`server started on port ${port}`))