const mongoose = require('mongoose');

const { Schema } = mongoose;
const reviewSchema = new Schema({
  rating: {
    type: Number,
    match: [1 - 5, "Input score 1-5 to rate"],
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  itemId: {
    type: Schema.Types.ObjectId,
    ref: 'item'
  },
  transaction: {
    type: Schema.Types.ObjectId,
    ref: 'Transaction'
  },
  isAlready: false,
},
  { timestamps: true }
)

module.exports = mongoose.model('Review', reviewSchema)
