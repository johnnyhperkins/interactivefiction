const mongoose = require('mongoose')

const SectionSchema = new mongoose.Schema(
  {
    firstLine: String,
    order: Number,
    poem: { type: mongoose.Schema.ObjectId, ref: 'Poem' },
    stanzas: Array
  },
  { timestamps: true }
)

module.exports = mongoose.model('Section', SectionSchema)
