const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: String,
  email: String,
  subject: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Course = mongoose.model('message', Schema)

module.exports = Course
