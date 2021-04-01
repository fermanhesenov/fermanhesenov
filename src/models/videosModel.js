const mongoose = require('mongoose');  


const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  videoID: { type: String, required: true, trim: true },
  videoTitle: { type: String, required: true, trim: true },
  videoDesc: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now() }
});


const Video = mongoose.model('Video', schema);

module.exports = Video;