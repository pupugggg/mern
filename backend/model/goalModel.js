const mongoose = require('mongoose')
//model is where we define schema of the input field and get the model.
const goalSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'please add a text value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Goal',goalSchema)