const mongoose = require('mongoose')
const Schema = mongoose.Schema

const positionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  sale: {
    type: Number,
    required: true
  },
  imageSrc: {
    type: String,
    default: ''
  },
  category: {
    ref: 'categories',
    type: Schema.Types.ObjectId
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
})

module.exports = mongoose.model('positions', positionSchema)
