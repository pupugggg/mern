const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')
const { sendfile } = require('express/lib/response')
const port = (process.env.PORT||5000)
connectDB()
//  initialize server.
const app = express()
app.use(cors())
//  apply middleware in order to parsing http body by json and urlencoded.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//  Set the route of the server
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

if(process.env.NODE_ENV=="production"){
  app.use(express.static(path.join(__dirname,'../frontend/build')))
  app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html')))
}else{
  app.get('/',(req,res)=>res.send('please set to production'))
}


//  Overwrite the default error handler so that server won't respond a html file to show the error.
app.use(errorHandler)

//  start the server
app.listen(port, () => console.log(`server started on port ${port}`))
