const Review = require('../models/reviewItem'),
  Item = require('../models/item')

// exports.create = (req, res) => {
//    req.body._id = new mongoose.Types.ObjectId()
//    req.body.userId = req.user.id
//    console.log(req.body)
//    Review.create(req.body)
//      .then((data)=> {
//          Item.findByIdAndUpdate(req.body.itemId, {$push:{review: data}}).exec().then(()=>
//          res.status(200).json({
//              success: true, 
//              message: "Review successfully created!"
//          }))
//      })
//      .catch((err)=> {
//           res.status(400).json({
//               success: false,
//               message: err.message || "Failed to create review!"
//           })
//      })
// }
exports.create = async (req, res) => {
  let dataReview = await Review.findById({ _id: req.body.reviewId })

  if (req.body.description !== undefined && req.body.rating !== undefined) {
    dataReview.description = req.body.description
    dataReview.rating = req.body.rating
    dataReview.isAlready = true

    let data = await dataReview.save(doc)
    console.log(doc)
      .then((doc) => {
        Item.findByIdAndUpdate(req.body.itemId, { $push: { review: doc } }).exec().then(() => {
          res.status(201).json({
            success: true,
            message: 'ok we create review here',
            data: doc
          })
        })
      })


  }
  else {
    res.send(401).json({
      success: false,
      message: 'please put your review dude'
    })
  }
}
