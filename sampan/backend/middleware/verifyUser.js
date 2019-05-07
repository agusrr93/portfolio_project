const User = require('../models/user')

exports.userVerify = (req, res, next) => {
    User.findOne({ _id: req.user.id })
    .then(data => {
        data.verify == false ? res.status(403).json({
            success: false,
            message: "You are not Verify!"
        }) : next()
    })
    .catch()
}