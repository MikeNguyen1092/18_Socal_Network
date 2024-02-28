const { User, Thought } = require('../models');

module.exports = {
	//
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
			const user = await User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: thought._id } }, { new: true });

			if (!user) {
				return res.status(404).json({ message: 'Line 36 No user with this id!' });
			}
			return res.json(thought);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: 'Could not create thought' }, err);
		}
	},
	// update thought by ID
	async updateThought(req, res) {
		try {
			const thought = await Thought.findOneAndUpdate({ _id: req.body.thoughtId }, { $set: req.body }, { runValidators: true, new: true });

			if (!thought) {
				return res.status(400).json({ message: 'No thought with this id' });
			}
			return res.json(thought);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: 'Could not update thought' }, err);
		}
	},

	// delete thought by ID
	async deleteThought(req, res) {
		try {
			const thought = await Thought.findOneAndDelete({
				_id: req.params.thoughtId,
			});

			if (!thought) {
				return res.status(404).json({ message: 'No thought with this id!' });
			}

			const user = User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });

			if (!user) {
				return res.status(404).json({ message: 'No user with this id!' });
			}

			return res.json({ message: 'Thought deleted!' });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: 'Could not delete thought' }, err);
		}
	},

	async addReaction(req, res) {
		try {
			const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true });

			return res.json(thought);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: 'Could not add reaction' }, err);
		}
	},

	async removeReaction(req, res) {
		try {
			const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId }}}, { runValidators: true, new: true });
			return res.json(thought)
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: 'Could not add reaction' }, err);
		}
	},
};
