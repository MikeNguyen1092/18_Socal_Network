const { ObjectId } = require('mongoose').Types;
const { User, Reaction, Thought } = require('../models');

module.exports = {
	// get all users
	async getUsers(req, res) {
		try {
			const user = await User.find();
			return res.json(user);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},

  // get single user
	async getSingleUser(req, res) {
		try {
			const singleUser = User.findOne({ _id: req.params.userId }).select('-__v').lean();

			if (!singleUser) {
				return res.status(404).json({ message: 'No user with that ID' });
			}

			return res.json(user);
		} catch (err) {
			console.log(err);
			return res.status(500).json('message: Could not get Single User', err);
		}
	},

  // create user
  async createUser(req, res) {
    try{
      const user = await User.create(req.body);
			res.json(user);
    } catch (err) {
			console.log(err);
			return res.status(500).json('message: Could not create User', err);
		}
  }
};
