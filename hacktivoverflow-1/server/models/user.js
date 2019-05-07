const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

var isEmail = function(val) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
}

var userSchema = new Schema({
    name : {
        type: String,
        required: [true, 'Name not null']
    },
    email : {
        type: String,
        unique: [true, 'Email was already exist'],
        required: [true, 'Email not null'],
        validate: [isEmail, 'Wrong Email Format']
    },
    password : {
        type: String,
        minlength: [5, 'Password Min 5 Caracters'],
        required: [true, 'Password not null']
    },
    img: {
        type: 'String',
        default: 'http://www.fao.org/fileadmin/templates/experts-feed-safety/images/profile-img03.jpg'
    },
    isGoogle: {
        type: Number,
        default: 0
    },
    isVerification: {
        type: Boolean,
        default: false
    },
    reputation: {
        type: Number,
        default: 0
    }
}, { 
    timestamps: true 
})

userSchema.pre('save', function(next) {
    if(this.password){
        let salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

var User = mongoose.model('User', userSchema)

module.exports = User