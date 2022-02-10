//  routes define how end-point send the request to interact with the back-end.
const express = require('express')
const router = express.Router()
const {getGoals,setGoals,updateGoals,deleteGoals} = require('../controllers/goalController')
//specify the route
router.route('/').get(getGoals).post(setGoals)
router.route('/:id').put(updateGoals).delete(deleteGoals)

module.exports = router
