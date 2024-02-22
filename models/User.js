const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
  email: {
    type: String,
    match: [/.+@.+\..+/, 'Must match an email address!'],
		required: true,
		unique: true,
  }
});

const User = model('User', userSchema)

module.exports = User;
