//  routes define how end-point send the request to interact with the back-end.
const express = require('express')
const router = express.Router()
const {getGoals,setGoals,updateGoals,deleteGoals} = require('../controllers/goalController')
const {protect} = require('../middleware/authMiddleware')
//specify the route
router.route('/').get(protect,getGoals).post(protect,setGoals)
router.route('/:id').put(protect,updateGoals).delete(protect,deleteGoals)

module.exports = router
