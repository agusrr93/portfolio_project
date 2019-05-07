const mongoose = require('mongoose');
const textSearch = require('mongoose-text-search')
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true, max: [50, 'maximum characters are 50'] },
  description: { type: String, required: true, max: [100, 'maximum characters are exceded']},
  itemId: {type: Schema.Types.ObjectId, ref : 'item'},
  image : { type: String},
  darkBackground: { type: Boolean, default: true}},
{timestamps: true });

categorySchema.plugin(textSearch)
categorySchema.index({name :'text', description: 'text'})

module.exports = mongoose.model('Category', categorySchema);
