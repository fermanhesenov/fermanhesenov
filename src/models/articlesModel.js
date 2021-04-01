const mongoose =  require('mongoose');  


const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  artTitle: { type: String, required: true, trim: true },
  artText: { type: String, required: true, trim: true },
  artThumbnail: { type: String, required: true, trim: true },
  artThumbnailSmall: { type: String },
  date: { type: Date, default: Date.now() }
});


const Article = mongoose.model('Article', schema);

module.exports =  Article;