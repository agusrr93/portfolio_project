const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  uniqueValidator = require("mongoose-unique-validator"),
  mongoosePaginate = require('mongoose-paginate')


// Create cartSchema
const trainingCodeSchema = new Schema({
  code: {
    type: Number,
    unique: [true, 'Code already exists'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  deletedAt: {
    type: Date,
    default: null
  }
},
  { timestamps: true }
)

trainingCodeSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be Unique"
})

trainingCodeSchema.plugin(mongoosePaginate)

// export the module
module.exports = mongoose.model('Training', trainingCodeSchema)