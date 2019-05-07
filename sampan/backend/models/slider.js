const mongoose = require('mongoose')

const { Schema } = mongoose;
const sliderSchema = new Schema({
  adminId : {type: Schema.Types.ObjectId, ref : 'Admin'},
  image : {type: String, required: true},
  title : {type: String, required: true},
  description : {type: String, required: true}
},
{timestamps: true})

module.exports= mongoose.model('Slider', sliderSchema)
