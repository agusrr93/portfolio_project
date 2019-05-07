const Item = require('../models/item'),
  Transactions = require('../models/transaction'),
  Review = require('../models/reviewItem')

// Authorization User Item
exports.isAuthorized = (req, res, next) => {
  Item.findById({ _id: req.params.id })
    .then((data) => {
      data.userId.toString() === req.user._id.toString() ? next() : res.status(401).json({
        status: false,
        message: 'sorry it is not your items, why you try to edit this?'
      })
    })
    .catch((err) => {
      res.status(401).json({
        status: false,
        message: 'hi you are rude , give me wrong id'
      })
    })
}

// Authorization Seller/Mitra Item in Transaction
exports.sellerAuthorized = (req, res, next) => {
  Transactions.findById({ _id: req.body.transactionId })
    .then((data) => {
      console.log(req.user._id)
      console.log(data.sellerId)
      if (data.sellerId.toString() === req.user._id.toString()) {
        next()
      }

      else {
        res.status(401).json({
          status: false,
          message: 'sorry it is not your transactions, why you try to edit this?'
        })
      }
    })
    .catch((err) => {
      res.status(401).json({
        status: false,
        message: 'hi you are rude , give me wrong id'
      })
    })
}

// Authorization User Item in Transaction
exports.buyerAuthorized = (req, res, next) => {
  Transactions.findById({ _id: req.body.transactionId })
    .then((data) => {
      if (data.userId.toString() === req.user._id.toString()) {
        next()
      }

      else {
        res.status(401).json({
          status: false,
          message: 'sorry it is not your transactions, why you try to edit this?'
        })
      }
    })
    .catch((err) => {
      res.status(401).json({
        status: false,
        message: 'hi you are rude , give me wrong id'
      })
    })
}

// Authorization User Review
exports.reviewAuthorized = (req, res, next) => {
  Review.findById({ _id: req.body.reviewId })
    .then((data) => {
      if (data.userId.toString() === req.user._id.toString()) {
        next()
      }

      else {
        res.status(401).json({
          status: false,
          message: 'sorry it is not your transactions, why you try to edit this?'
        })
      }
    })
    .catch((err) => {
      res.status(401).json({
        status: false,
        message: 'hi you are rude , give me wrong id'
      })
    })
}