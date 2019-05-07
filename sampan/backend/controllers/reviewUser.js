const ReviewUser = require('../models/reviewUser')
const User = require('../models/user')

exports.create = (req, res) => {
  console.log(req.body)
  ReviewUser.create(req.body)
    .then((data) => {
      User.findByIdAndUpdate(req.body.userId, { $push: { "local.review": data } }).exec().then(() => {
        res.status(200).json({
          success: true,
          message: 'Review sucessfully created!'
        })
      })
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: 'Unsuccessfully creating review!',
        err: err.message
      })
    })
}