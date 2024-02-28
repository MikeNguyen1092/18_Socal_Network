const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
	createdAt: {
		type: Date,
		default: Date.now,
	},
	reactionBody: {
		type: String,
		required: true,
		maxLength: 280,
	},
	username: {
		type: String,
		required: true,
	},
});


module.exports = reactionSchema;
