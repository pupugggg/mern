//  Controllers specify the callbacks of the routes
const asyncHandler = require('express-async-handler')
//
const Goal = require('../model/goalModel')
const User = require('../model/userModel')

//use async function so that we can interact with mongoDB

//  @desc Get goals
//  @route GET /api/goals/
//  @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user._id })
  res.status(200).json(goals)
})
//  @desc Set goals
//  @route POST /api/goals/
//  @access Private
const setGoals = asyncHandler(async (req, res) => {
  //  if payload/http body is empty
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text Field')
  } else {
    const goal = await Goal.create({
      text: req.body.text,
      user: req.user.id,
    })
    res.status(200).json(goal)
  }
})
//  @desc update goals
//  @route PUT /api/goals/:id
//  @access Private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error('goal not found')
  }

  const user = req.user
  //check for the user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  //check if the target goal match the user
  if (goal.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedGoal)
})
//  @desc Get goals
//  @route DELETE /api/goals/:id
//  @access Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error('goal not found')
  }
  const user = req.user
  //check for the user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  //check if the target goal match the user
  if (goal.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  //or just use await goal.remove()
  await Goal.findByIdAndDelete(req.params.id)
  res.status(200).json(goal)
})

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
}
