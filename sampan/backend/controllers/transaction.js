const Transaction = require('../models/transaction'),
  Item = require('../models/item'),
  Cart = require('../models/cart'),
  UpdateCart = require('./cart').updateCart,
  Review = require('../models/reviewItem'),
  moment = require('moment')


const formatTime = (createdAt) => {
  const thisMoment = moment.utc(createdAt).format("Do MMMM YYYY, h:mm:ss a");
  return thisMoment;
}

// (POST) Checkout
exports.checkout = (req, res) => {
  const userId = req.user.id
  const { quantity } = req.body
  // let balikan = UpdateCart(quantity, userId)

  let kuantitas = JSON.parse(quantity)
  let promises = []
  Cart.find({ userId: userId })
    .populate('itemId')
    .then((data) => {
      data.forEach((dataCart, index) => {
        dataCart.qty = kuantitas[index]
        if (dataCart.qty > dataCart.itemId.stock) {
          dataCart.qty = dataCart.itemId.stock
        }
        promises.push(dataCart.save())
      })
      Promise.all(promises)
        .then(() => {
          Cart.find({ userId: userId })
            .populate({ path: 'itemId', populate: { path: 'userId' } })
            .then(data => {

              let barang_checkoutan = data
              let seller = []
              data.forEach((data) => {
                seller.push(data.itemId.userId)
              })

              let unique = [...new Set(seller)];

              let final_checkout = []

              unique.forEach((penjual) => {
                let itemPenjual = []
                let total = 0
                barang_checkoutan.forEach((barang) => {
                  if (penjual._id.toString() === barang.itemId.userId._id.toString()) {
                    let subTotal = barang.qty * barang.itemId.price
                    total = total + subTotal
                    itemPenjual.push({ quantity: barang.qty, detailBarang: barang.itemId, sub_total: subTotal })
                  }
                })
                final_checkout.push({ seller: penjual.local.username, item: itemPenjual, total_belanjaan: total })
              })

              final_checkout.forEach((data) => {
                let itemArr = []
                let subTotal = []
                let qty = []
                var total_belanjaan = 0

                data.item.forEach((itemData) => {
                  total_belanjaan = total_belanjaan + itemData.sub_total
                  itemArr.push(itemData.detailBarang._id)
                  subTotal.push(itemData.sub_total)
                  qty.push(itemData.quantity)
                })
              })

              res.status(200).json({
                status: true,
                data: final_checkout
              })
            })
        })
    })
}

// (POST) Confirm Order, Checkout
exports.confirmOrder = (req, res) => {
  const userId = req.user.id
  let seller = []
  let final_checkout = []

  Cart.find({ userId: userId })
    .populate({ path: 'itemId', populate: { path: 'userId' } })
    .then(async (data) => {
      let itemCheckout = data

      data.map((nxl) => {
        seller.push(nxl.itemId.userId)
      })

      data.map((ez) => {
        Item.findById(ez.itemId._id)
          .then(item => {
            if ((item.stock - ez.qty) < 0) {
              res.status(400).json({
                status: false,
                message: 'sorry, the items ' + ez.itemId.name + ' is not in sufficient stock'
              })
            }
            else {
              item.stock = item.stock - ez.qty
              item.bought = item.bought + ez.qty
              item.save()
            }
          })
      })

      let unique = [...new Set(seller)]

      unique.map((sales) => {
        let itemSales = []
        let total = 0
        itemCheckout.map((dos) => {
          if (sales._id == dos.itemId.userId._id) {
            let subTotal = dos.qty * dos.itemId.price
            total = total + subTotal
            itemSales.push({ quantity: dos.qty, detailItem: dos.itemId, sub_total: subTotal })
          }
        })
        final_checkout.push({ seller: sales, item: itemSales, totalOrder: total })
      })

      var promise = []

      final_checkout.map((data) => {
        let itemArr = []
        let subTotal = []
        let qty = []
        let totalOrder = 0

        data.item.map((itemData) => {
          totalOrder = totalOrder + itemData.sub_total
          itemArr.push(itemData.detailItem._id)
          subTotal.push(itemData.sub_total)
          qty.push(itemData.quantity)
        })

        let transactionSave = new Transaction({
          userId: userId,
          sellerId: data.item[0].detailItem.userId._id,
          itemId: itemArr,
          transactionJourney: 'not paid',
          subPrice: subTotal,
          totalPrice: totalOrder
        })
        promise.push(transactionSave.save())
      })
      await Cart.deleteMany({ userId: userId })

      Promise.all(promise)
        .then((data) => {
          const promise3 = []

          data.map(xyz => {
            let coba = Transaction.findById(xyz._id)
              .populate('itemId')
              .populate('sellerId')
            promise3.push(coba)
          })
          Promise.all(promise3).then(data => {
            res.status(201).json({
              succes: true,
              message: 'this is your order, please transfer to process your order',
              data: data
            })
          })
            .catch((err) => {
              res.status(400).json({
                success: false,
                error: err.message
              })
            })
        })
    })
}

// (PUT) User Upload Bukti Transfer
exports.updateTransactionJourney = (req, res) => {
  const userId = req.user.id
  if (req.file !== undefined) {
    Transaction.findOneAndUpdate(
      { _id: req.body.transactionId, userId: userId },
      { $set: { photo: (req.file.url), transactionJourney: 'pending' } },
      { new: true }, (err, transInfo) => {
        if (err) {
          res.status(400).json({
            succes: false,
            message: err.message || "You must input file"
          })
        } else {
          res.status(200).json({
            succes: true,
            message: "your payment is being verified, please wait, thanks",
            data: transInfo
          })
        }
      })
  }
  else {
    res.status(401).json({
      success: false,
      message: "You must input file"
    })
  }
}

// (GET) Admin Look Transaction
exports.adminTransaction = (req, res) => {
  Transaction.find({})
    .populate('userId')
    .populate('sellerId')
    .populate('itemId')
    .sort({ 'updatedAt': -1 })
    .then((data) => {
      res.status(200).json({
        succes: true,
        message: 'Get data for admin success',
        data: data
      })
    })
    .catch((err) => {
      res.status(401).json({
        succes: false,
        message: err.message
      })
    })
}

// (PUT) Admin Change Status Jorney 'Paid'
exports.adminPaid = (req, res) => {
  let id = req.body.transactionId

  Transaction.findOneAndUpdate(
    { _id: id },
    { $set: { transactionJourney: 'paid' } },
    { new: true }
  )
    .then(data => {
      res.status(201).json({
        succes: true,
        message: 'Success to update Status Jorney',
        data: data
      })
    })
    .catch(err => {
      res.status(401).json({
        succes: false,
        message: err.message
      })
    })
}

// (GET) Mitra Show Order
exports.showOrder = (req, res) => {
  let sellerId = req.user.id

  Transaction.find({ sellerId })
    .populate('itemId')
    .populate('userId')
    .sort({ 'updatedAt': -1 })

    .then(data => {
      let copy = [...data]
      let formatted = []
      copy.forEach(data => {
        formatted.push(formatTime(data.updatedAt))
      })
      res.status(201).json({
        succes: true,
        message: 'This is your order dude',
        data: { data: copy, time: formatted }
      })
    })
    .catch(err => {
      res.status(401).json({
        succes: false,
        message: err.message
      })
    })
}

// (GET) User Show Order
exports.showOrderUser = (req, res) => {
  let userId = req.user.id

  Transaction.find({ userId })
    .populate('itemId')
    .populate('sellerId')
    .sort({ 'updatedAt': -1 })

    .then(data => {
      let copy = [...data]
      let formatted = []
      copy.forEach(data => {
        formatted.push(formatTime(data.updatedAt))
      })
      res.status(201).json({
        succes: true,
        message: 'This is your order dude',
        data: { data: copy, time: formatted }
      })
    })
    .catch(err => {
      res.status(401).json({
        succes: false,
        message: err.message
      })
    })
}

// (PUT) Mitra Change Status Journey 'cancelled'
exports.cancel = (req, res) => {
  let userId = req.user.id
  let id = req.body.transactionId

  Transaction.findOneAndUpdate(
    { sellerId: userId, _id: id },
    { $set: { transactionJourney: 'cancelled' } },
    { new: true }
  )

    .then(data => {
      res.status(201).json({
        succes: true,
        message: 'This is your order dude',
        data: data
      })
    })
    .catch(err => {
      res.status(401).json({
        succes: false,
        message: err.message
      })
    })
}

// (PUT) Mitra Change Status Journey 'on process'
exports.onProcess = (req, res) => {
  let userId = req.user.id
  let id = req.body.transactionId

  Transaction.findOneAndUpdate(
    { sellerId: userId, _id: id },
    { $set: { transactionJourney: 'on process' } },
    { new: true }
  )

    .then(data => {
      res.status(201).json({
        succes: true,
        message: 'This is your order dude',
        data: data
      })
    })
    .catch(err => {
      res.status(401).json({
        succes: false,
        message: err.message
      })
    })
}

// (PUT) Mitra Change Status Journey 'shipping'
exports.shipping = (req, res) => {
  let userId = req.user.id
  let id = req.body.transactionId

  Transaction.findOneAndUpdate(
    { sellerId: userId, _id: id },
    { $set: { receipt: req.body.receipt, transactionJourney: 'shipping' } },
    { new: true }
  )
    .then(data => {
      res.status(201).json({
        succes: true,
        message: 'Success to input receipt. Order is on going shipping',
        data: data
      })
    })
    .catch(err => {
      res.status(401).json({
        succes: false,
        message: err.message
      })
    })
}

// (PUT) User Change Status Journey 'done'
exports.done = (req, res) => {
  let userId = req.user.id
  let id = req.body.transactionId

  Transaction.findOneAndUpdate(
    { userId: userId, _id: id },
    { $set: { transactionJourney: 'done', deletedAt: new Date() } },
    { new: true }
  )
    .populate('itemId')
    .then(data => {
      data.itemId.forEach((review) => {
        let reviewItem = new Review({
          rating: null,
          description: null,
          userId: userId,
          itemId: data.itemId,
          isAlready: false
        })
        reviewItem.save()
      })
      res.status(201).json({
        succes: true,
        message: 'Order Done ',
        data: data
      })
    })
    .catch(err => {
      res.status(401).json({
        succes: false,
        message: err.message
      })
    })
}

// (GET) Admin Show Detail Transaction
exports.showTransId = (req, res) => {
  let id = req.body.transactionId

  Transaction.findById({ _id: id })
    .populate('itemId')
    .populate('sellerId')
    .populate('userId')
    .then(result => {
      res.status(201).json({
        succes: true,
        message: 'This is your order dude',
        data: result
      })
    })
    .catch(err => {
      res.status(401).json({
        succes: false,
        message: err.message
      })
    })
}

// (GET) Mitra Show Detail Order
exports.mitraShowDetailOrder = (req, res) => {
  let userId = req.user.id
  let id = req.params.transactionId

  Transaction.findById({ userId, _id: id })
    .populate('itemId')
    .populate('userId')
    .populate('sellerId')
    .then(result => {
      let formatter = formatTime()
      res.status(201).json({
        succes: true,
        message: 'This is your order dude',
        data: {data: result, time: formatter}
      })
    })
    .catch(err => {
      res.status(401).json({
        succes: false,
        message: err.message
      })
    })
}
