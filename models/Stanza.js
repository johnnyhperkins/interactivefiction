const mongoose = require('mongoose')

const StanzaSchema = new mongoose.Schema(
  {
    section: { type: mongoose.Schema.ObjectId, ref: 'Section' },
    poem: { type: mongoose.Schema.ObjectId, ref: 'Poem' },
    leadWord: String,
    body: String
  },
  { timestamps: true }
)

module.exports = mongoose.model('Stanza', StanzaSchema)
