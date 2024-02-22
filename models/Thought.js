const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
	thoughtText: {
		type: String,
		required: true,
		maxLength: 280,
	},
	createdAt: {

  },
  username: {
    type: String,
    required: true
  }
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
