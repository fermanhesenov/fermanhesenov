const mongoose = require('mongoose');  
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');


const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
	passwordHash: { type: String }
});


schema.methods.setPassword = function setPassword(password) {
	this.passwordHash = bcrypt.hashSync(password, 10)
};

schema.methods.isValidPassword = function isValidPassword(password) {
	return bcrypt.compareSync(password, this.passwordHash)
};

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign({
    email: this.email,
  }, 'thesecretisopened', { expiresIn: '6h' })
};

schema.methods.toAuth = function toAuth() {
  return {
		email: this.email,
    token: this.generateJWT()
  }
};

// schema plugins
schema.plugin(uniqueValidator, { message: "Bu malumat artiq movcuddur" });

const User = mongoose.model('User', schema);

module.exports = User;