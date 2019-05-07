const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const textSearch = require('mongoose-text-search')


const { Schema } = mongoose;
const itemSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  // commentId: { type : Schema.Types.ObjectId, ref : 'comment'},
  name: { type: String, required: true, max: [50, 'maximum characters are 50'] },
  stock: { type: Number, required: true , match: [0-9]}, //number only
  tags: { type: String, required: true },
  bought: { type: Number, required: true, default: 0, match: [0-9]}, //number only
  price: { type: Number, required: true, match: [0-9]}, //number only
  description: { type: String, required: true, max: [100, 'maximum characters are exceded'] },
  // seller: {type: String},
  photos: [{ type: String }],
  review: [{ type: Schema.Types.ObjectId, ref: 'Review'}]
},
  { timestamps: true });

  itemSchema.plugin(mongoosePaginate)
  itemSchema.index({name: 'text', tags: 'text', description: 'text'})

module.exports = mongoose.model('item', itemSchema);
