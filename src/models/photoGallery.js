const mongoose = require('mongoose');  


const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category: { type: String, required: true, trim: true },
  caption: { type: String, required: true, trim: true },
  src: { type: String, required: true, trim: true },
  srcSmall: { type: String, trim: true },
  date: { type: Date, default: Date.now() }
});


const Photo = mongoose.model('Photo', schema);

module.exports = Photo;