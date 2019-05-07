const mongoose = require('mongoose'),
  Schema = mongoose.Schema

// Create cartSchema
const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  itemId: {
    type: Schema.Types.ObjectId,
    ref: 'item'
  },
  qty: {
    type: Number,
    default: 1
  },
  deletedAt: {
    type: Date,
    default: null
  }
},
  { timestamps: true }
)

// export the module
module.exports = mongoose.model('Cart', cartSchema)
