const { User } = require('../models');

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
			const singleUser = await User.findOne({ _id: req.params.userId }).select('-__v').lean().populate('friends').populate('thoughts');

			if (!singleUser) {
				return res.status(404).json({ message: 'No user with that ID' });
			}

			return res.json(singleUser);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: 'Could not find Single User' }, err);
		}
	},

	// create user
	async createUser(req, res) {
		try {
			const user = await User.create(req.body);
			res.json(user);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: 'Could not create User' }, err);
		}
	},

	// delete user
	async deleteUser(req, res) {
		try {
			const user = await User.findOneAndDelete({ _id: req.params.userId });
			if (!user) {
				return res.status(404).json({ message: 'No user with this id!' });
			}
			res.json({ message: 'User successfully deleted' });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: 'Could not delete User' }, err);
		}
	},

	// add friend to user
	async addFriend(req, res) {
		try {
			const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });
			if (!user) {
				return res.status(404).json({ message: 'No friend found with that ID :(' });
			}

			return res.json(user);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: 'Could not add friend to User' }, err);
		}
	},

	// remove friend from user
	async removeFriend(req, res) {
		try {
			const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
			if (!user) {
				return res.status(404).json({ message: 'No Friend with this id!' });
			}

			return res.json(user);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: 'Could not delete friend from User' }, err);
		}
	},

	// update user
	async updateUser(req, res) {
		try {
			const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });

			if (!user) {
				return res.status(404).json({ message: 'No user with this id!' });
			}

			return res.json(user);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},
};
