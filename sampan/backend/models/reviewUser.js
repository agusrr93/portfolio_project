const mongoose = require('mongoose')

const { Schema } = mongoose

const reviewUserSchema = new Schema ({
    name: { 
        type: String,
        lowercase: true,
        match: [/^[a-zA-Z]/, "Alphabet only"],
        required: true,
        minlength: [3, "Minimum 3 characters"],
        maxlength: [15, "Maximum 15 characters"]
    },
    rating:{
        type: Number,
        match: [1 - 5, "Input score 1-5 to rate"],
        required: true
    },
    description:{
        type: String,
        required: true
    },
    userId: {
        type: String
    }

}, {timestamps: true})

module.exports = mongoose.model('ReviewUser', reviewUserSchema)