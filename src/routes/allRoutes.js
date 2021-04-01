const express  = require('express');
const mongoose  = require('mongoose');
const axios  = require('axios');
const moment  = require('moment');
const nodemailer  = require('nodemailer');
const xoauth2  = require('xoauth2');
const User  = require('../models/userModel');
const Photo  = require('../models/photoGallery.js');
const Quotes  = require('../models/wordPads.js');
const Video  = require('../models/videosModel.js');
const Article  = require('../models/articlesModel.js');
//user functions

const { sendEmail } =  require('../mailer.js');
const router = express.Router();

//register new acc

router.post('/register', (req, res) => {
	const { email, pass } = req.body.data;
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		email: email
	})
	user.setPassword(pass)
	user
		.save()
		.then(userRecord => res.json({ user: userRecord.toAuth() }))
		.catch(err => {
			console.log(err)
			return res.status(400).json({ errors: { global: parseErrors(err.errors) }})
		})
})

// enter to admin

router.post('/enter', (req, res) => {
	const { email, pass } = req.body.data;
	User.findOne({ email })
	.then(user => {
		if (user && user.isValidPassword(pass)) {
			res.json({ user: user.toAuth() })
		} else {
				res.status(400).json({errors: {global: "Malumatlar duzgun daxil edilmemishdir."}})
		}
	})
});

// admin add photo

router.post('/add-photo', (req, res) => {
	const { category, caption, src, srcSmall } = req.body.data;

	const newPhoto = new Photo({
		_id: new mongoose.Types.ObjectId(),
		category, caption, src, srcSmall
	})
	.save()
		.then(photo => res.json({ photo }))
		.catch(err => {
			console.log(err)
			return res.status(400).json({ errors: { fromDB: 'error quote adding' }})
		})
})

// admin get all photos

router.get('/get-all-photos', (req, res) => {
	 Photo.find({})
	 	.sort('-date')
		.exec((err, photos) => {
			if (err) return res.status(400).json({ fromDB: "error quote getting" })
			res.json({ photos })
		})
})

// admin get all photos

router.delete('/del-photo/:id', (req, res) => {
	const { id } = req.params;

	 Photo.findByIdAndRemove({ _id: id }, (err, photos) => {
	 	if (err) return res.status(400).json({ fromDB: "Photo Not Found" })
		res.json({ photos })
	 })
})


// admin add quote

router.post('/add-quote', (req, res) => {
	const { book, bookPage, bookImg, quote } = req.body.data;

	const newQuote = new Quotes({
		_id: new mongoose.Types.ObjectId(),
		book, bookPage, src: bookImg, quote
	})
	.save()
		.then(quotes => res.json({ quotes }))
		.catch(err => {
			console.log(err)
			return res.status(400).json({ errors: { fromDB: 'error quote adding' }})
		})
})

// admin get quotes

router.get('/get-all-quotes', (req, res) => {

	 Quotes.find({})
	 .sort('-date')
	 .exec((err, quotes) => {
	 	if (err) return res.status(400).json({ fromDB: "Quote Not Found" })
		res.json({ quotes })
	 })
})

// admin del quotes

router.delete('/del-quote/:id', (req, res) => {
	const { id } = req.params;

	 Quotes.findByIdAndRemove({ _id: id }, (err, quotes) => {
	 	if (err) return res.status(400).json({ fromDB: "Quote Not Found" })
		res.json({ quotes })
	 })
})

// admin add video

router.post('/add-video', (req, res) => {
	const { videoID, videoTitle, videoDesc } = req.body.data;

	const newVideo = new Video({
		_id: new mongoose.Types.ObjectId(),
		videoID, videoTitle, videoDesc
	})
	.save()
		.then(videos => res.json({ videos }))
		.catch(err => {
			console.log(err)
			return res.status(400).json({ errors: { fromDB: 'error quote video' }})
		})
})

// admin get videos

router.get('/get-all-videos', (req, res) => {

	 Video.find({})
	 .sort('-date')
	 .exec((err, videos) => {
	 	if (err) return res.status(400).json({ fromDB: "Video Not Found" })
		res.json({ videos })
	 })
})

// admin del videos

router.delete('/del-video/:id', (req, res) => {
	const { id } = req.params;

	 Video.findByIdAndRemove({ _id: id }, (err, videos) => {
	 	if (err) return res.status(400).json({ fromDB: "Video Not Found" })
		res.json({ videos })
	 })
})

// admin add article

router.post('/add-article', (req, res) => {
	const { artTitle, artText, artThumbnail, artThumbnailSmall } = req.body.data;

	const newArticle = new Article({
		_id: new mongoose.Types.ObjectId(),
		artTitle, artText, artThumbnail, artThumbnailSmall
	})
	.save()
		.then(articles => res.json({ articles }))
		.catch(err => {
			console.log(err)
			return res.status(400).json({ errors: { fromDB: 'error quote article' }})
		})
})

// admin get article

router.get('/get-all-articles', (req, res) => {

	 Article.find()
	 .sort('-date')
	 .exec((err, articles) => {
	 	if (err){
	 	    console.log(err);
	 	    return res.status(400).json({ fromDB: "Article Not Found" })
	 	} 
		res.json({ articles })
	 })
})

// admin del article

router.delete('/del-article/:id', (req, res) => {
	const { id } = req.params;

	 Article.findByIdAndRemove({ _id: id }, (err, articles) => {
	 	if (err) return res.status(400).json({ fromDB: "Article Not Found" })
		res.json({ articles })
	 })
})

// nodemailer 

router.post('/send-mail', async (req, res) => {
	const { data } = req.body;
	
	try {
		await sendEmail(data);
		res.json({ email: 'Gonderildi' })
	} catch(err) {
		console.log('email sent error')
	}
	
})


module.exports = router;