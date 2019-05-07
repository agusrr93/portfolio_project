const mongoose = require('mongoose'),
  mongoosePaginate = require('mongoose-paginate'),
  Schema = mongoose.Schema

// Create eventSchema
const eventSchema = new Schema({
  date: {
    type: String
  },
  eventTitle: {
    type: String
  },
  description: {
    type: String
  },
  participation: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  cityId: {
    type: Schema.Types.ObjectId,
    fef: "city"
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  deletedAt: {
    type: Date,
    default: null
  }
},
  { timestamps: true }
)

eventSchema.plugin(mongoosePaginate)
eventSchema.index({eventTitle: 'text', description: 'text'})

// export the module
module.exports = mongoose.model('Event', eventSchema)
