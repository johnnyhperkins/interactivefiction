const mongoose = require('mongoose')

const PoemSchema = new mongoose.Schema(
  {
    title: String,
    sections: [{ type: mongoose.Schema.ObjectId, ref: 'Section' }],
    url: String,
    createdAt: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.ObjectId, ref: 'User' },
    published: { type: Boolean, default: false }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Poem', PoemSchema)
