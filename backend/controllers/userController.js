const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
//  @desc register new user
//  @route POST /api/users
//  @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  //    check whether all fields are filled.
  if (!(name && email && password)) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  //    check if the user have already registered
  const userExist = await User.findOne({email})
  if (userExist){
      res.status(400)
      throw new Error('User already exist')
  }
  //Hash the password
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password,salt)

  //create user
  const user = await User.create({
      name,
      email,
      password:hashedPassword
  })
  //    check if user is created successfully
  if(user){
      res.status(201).json({
          _id:user.id,
          name:user.name,
          email:user.email,
          token:generateToken(user._id)
      })
  }else{
      res.status(400)
      throw new Error('Invalid user data')
  }
})
//  @desc Authenticate user
//  @route POST /api/users/login
//  @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    //check for user email
    const user = await User.findOne({email:email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('Invaild credentials')
    }
})
//  @desc Get user data
//  @route GET /api/users/me
//  @access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}

module.exports = { registerUser, loginUser, getMe }
