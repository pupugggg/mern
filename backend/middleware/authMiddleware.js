const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

//check if the client have access token
const protect = asyncHandler(async (req,res,next)=>{
    //access token is stored in the header of the request, and it should be in the structure like 'Bearer <token>'
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from http request header
            token = req.headers.authorization.split(' ')[1]
            //use jwt.verify to decode the access token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            //retrieve user data except hashed password according to user id provided by access token.
            req.user = await User.findById(decoded.id).select('-password')
            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports={protect}