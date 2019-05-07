const mongoose = require('mongoose'),
  Schema = mongoose.Schema

// Create cartSchema
const transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  itemId: [{
    type: Schema.Types.ObjectId,
    ref: 'item'
  }],
  transactionJourney: {
    type: String,
    enum: ['not paid', 'pending', 'paid', 'cancelled', 'on process', 'shipping', 'done']
  },
  subPrice: [{
    type: Number
  }],
  totalPrice: {
    type: Number
  },
  photo: {
    type: String,
    default: null
  },
  receipt: {
    type: String,
    default: null
  },
  deletedAt: {
    type: Date,
    default: null
  }
},
  { timestamps: true}
)


// export the module
module.exports = mongoose.model('Transaction', transactionSchema)
