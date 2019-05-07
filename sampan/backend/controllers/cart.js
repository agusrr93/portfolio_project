const Cart = require('../models/cart'),
  Item = require('../models/item')

// (POST) Add Item to Cart
exports.addCart = (req, res) => {
  const { itemId } = req.body,
    userId = req.user.id,
    newCart = new Cart({ userId, itemId })

  Cart.findOne({ itemId, userId })
    .populate('itemId')
    .then(cart => {
      if (cart) {
        cart.qty += 1
        if (cart.qty > cart.itemId.stock) {
          cart.qty = cart.itemId.stock
        }

        cart.save()
          .then((dataCart) => {
            res.status(201).json({
              success: true,
              message: "The Cart is created successfully",
              data: dataCart
            })
          })
          .catch((err) => {
            res.status(500).json({
              success: false,
              message: err.message
            })
          })

      } else {
        newCart.save()
          .then((dataCart) => {
            res.status(201).json({
              success: true,
              message: "The Cart is created successfully",
              data: dataCart
            })
          })
          .catch((err) => {
            res.status(500).json({
              success: false,
              message: err.message
            })
          })
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message
      })
    })
}

// (DELETE) Delete Item in Cart
exports.deleteCart = (req, res) => {
  const { itemId } = req.body,
    userId = req.user.id

  Cart.deleteOne({ itemId, userId })
    .then((data) => {
      Cart.find({ userId })
        .then((dataCart) => {
          res.status(201).json({
            success: true,
            message: "The remaining Item is here",
            data: dataCart
          })
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: err.message
          })
        })
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message
      })
    })
}


// (PUT) Update Item in Cart
exports.updateCart = (parameter, user,) => {
  const quantity = parameter,
    userId = user

  let kuantitas = JSON.parse(quantity)
  let error = false

  kuantitas.forEach(element => {
    if (typeof element === 'string' || element === 0) {
      error = true
    }
  });

  if (error == false) {
    Cart.find({ userId: userId })
      .populate('itemId')
      .then((data) => {
        data.forEach(async(dataCart, index) => {
          dataCart.qty = kuantitas[index]
          if (dataCart.qty > dataCart.itemId.stock) {
            dataCart.qty = dataCart.itemId.stock
          }
          dataCart.save()
        })
      })
      return 'success'
  }
  else {
    return 'failed'
  }
}

exports.showCart = (req, res) => {
  Cart.find({ userId: req.user._id })
    .populate({ path: 'itemId', populate: { path: 'userId' } })
    .then(doc => {
      res.status(200).json({
        success: true,
        data: doc
      })
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      })
    })
}
