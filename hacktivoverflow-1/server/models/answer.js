const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const answerSchema = new Schema({
    text:{
        type: String,
        required: true
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    upVotes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    downVotes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]
},{
    timestamps: true
});

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;