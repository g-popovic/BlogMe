const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	author: String,
	content: String
});

const postSchema = new mongoose.Schema({
	author: String,
	title: String,
	content: String,
	date: Date,
	postTime: String,
	likes: {
		type: Number,
		default: 0
	},
	favorites: {
		type: Number,
		default: 0
	},
	comments: {
		type: [commentSchema],
		default: []
	},
	liked: {
		type: Boolean,
		default: false
	},
	favorited: {
		type: Boolean,
		default: false
	}
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
