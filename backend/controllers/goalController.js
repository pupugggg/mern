//  Controllers specify the callbacks of the routes
const asyncHandler = require('express-async-handler')
//use async function so that we can interact with mongoDB

//  @desc Get goals
//  @route GET /api/goals/
//  @access Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get Goals' })
})
//  @desc Set goals
//  @route POST /api/goals/
//  @access Private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text Field')
    } else {
        console.log(req.body)
        res.status(200).json({ message: 'Set Goal' })
    }
})
//  @desc update goals
//  @route PUT /api/goals/:id
//  @access Private
const updateGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Goal ${req.params.id}` })
})
//  @desc Get goals
//  @route DELETE /api/goals/:id
//  @access Private
const deleteGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Goal ${req.params.id}` })
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}