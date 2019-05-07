const mongoose = require('mongoose');

const { Schema } = mongoose;
const citySchema = new Schema({
  name: { type : String, required : true, unique : true, lowercase : true},
  description:{ type : String, required : true}},
{ timestamps: true });

citySchema.index = ({name: 'text', description: 'text'})

module.exports = mongoose.model('city', citySchema);
