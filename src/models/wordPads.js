const mongoose = require('mongoose');  


const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  book: { type: String, required: true, trim: true },
  bookPage: { type: String, required: true, trim: true },
  src: { type: String, required: true },
  quote: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now() }
});


const Quotes = mongoose.model('Quotes', schema);

module.exports = Quotes;