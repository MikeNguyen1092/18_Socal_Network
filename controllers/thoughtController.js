const { User, Thought } = require('../models');

module.exports = {
	async getThoughts(req, res) {
		try {
			const thought = await Thought.find();
			return res.json(thought);
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	},

	async getSingleThought(req, res) {
		try {
			const singleThought = await Thought.findOne({ _id: req.params.thoughtId });

			if (!singleThought) {
				return res.status(404).json({ message: 'No thought with that ID' });
			}

			return res.json(singleThought);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: 'Could not find a Single thought' }, err);
		}
	},

	async createThought(req, res) {
		try {
			const thought = await Thought.create(req.body);
			const user = await User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: thoughtData._id } }, { new: true });

			if (!user) {
				return res.status(404).json({ message: 'No user with this id!' });
			}
			return res.json(thought);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: 'Could not create thought' }, err);
		}
	},
};
