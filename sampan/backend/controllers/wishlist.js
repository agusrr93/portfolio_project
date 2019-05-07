const wishList = require('../models/wishlist')

exports.get = (req, res) => {
  wishList.find({ userId: req.user.id })
  .populate('itemId')
    .then(data => {
      res.status(200).json({
        success: true,
        data: data
      })
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message || 'Error get data'
      })
    })
}

exports.post = async (req, res) => {
  let Wishlist = new wishList({
    userId: req.user.id,
    itemId: req.body.itemID
  })
  await Wishlist
    .save()
    .then(result => {
      return res.status(201).json({
        success: true,
        message: result
      })
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        message: err.message || "Error adding to wishlist!"
      })
    })

}