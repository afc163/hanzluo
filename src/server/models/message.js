const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Message = mongoose.model('message', Schema)

module.exports = Message
