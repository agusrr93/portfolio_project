const mongoose = require('mongoose'),
  Schema = mongoose.Schema


//create a Schema
const wishList = new Schema({
    userId : {
        type: String
    },
    itemId : {
        type: Schema.Types.ObjectId,
        ref: 'item'
    }
})


module.exports = mongoose.model("Wishlist", wishList)