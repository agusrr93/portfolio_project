const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

var threadSchema = new Schema({
    title : {
        type: String,
        required: [true, 'Title not null']
    },
    question : {
        type: String,
        required: [true, 'Question not null']
    },
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    answers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Answer'
    }],
    upVotes:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    downVotes: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    views: {
        type: Number,
        default: 0
    },
    isSolved: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true 
})

var Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread