const router = require("express").Router();
let Post = require("../models/post.model");
let User = require("../models/user.model");

// Add a new post
router.route("/new-post").post((req, res) => {
	if (req.session.authenticated) {
		const newPost = Post({
			author: req.session.username,
			title: req.body.title,
			content: req.body.content,
			date: new Date()
		});

		newPost
			.save()
			.then(() => res.send("Post added successfully."))
			.catch(err => res.send(err));
	} else {
		res.status(401).send("You need to login first.");
	}
});

// Like a post
router.route("/like/:id").patch((req, res) => {
	if (req.session.authenticated) {
		User.findById(req.session.userID, (err, result) => {
			if (err) {
				res.send(err);
			} else {
				if (result.likedPostsIDs.includes(req.params.id)) {
					Post.findByIdAndUpdate(req.params.id, { $inc: { likes: -1 } })
						.then(() => {
							result
								.updateOne({
									$pull: { likedPostsIDs: req.params.id }
								})
								.then(() => res.send("Liked post."))
								.catch(err => {
									res.send(err);
								});
						})
						.catch(err => res.send(err));
				} else {
					Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } })
						.then(() => {
							result
								.updateOne({
									$push: { likedPostsIDs: req.params.id }
								})
								.then(() => res.send("Unliked post."))
								.catch(err => {
									res.send(err);
								});
						})
						.catch(err => res.send(err));
				}
			}
		});
	} else {
		res.status(401).send("You need to login first.");
	}
});

// Post a comment
router.route("/new-comment/:postId").post((req, res) => {
	if (req.session.authenticated) {
		Post.findOneAndUpdate(
			{ _id: req.params.postId },
			{
				$push: {
					comments: { author: req.session.username, content: req.body.content }
				}
			}
		)
			.then(() => res.send("Added comment."))
			.catch(err => res.send(err));
	} else {
		res.status(401).send("You need to login first.");
	}
});

// Get all posts
router.route("/all").get((req, res) => {
	Post.find()
		.then(posts => {
			posts.forEach(post => {
				post.postTime = calculateTimeDifference(post.date);
			});
			if (req.session.authenticated) {
				User.findById(req.session.userID)
					.then(user => {
						posts.forEach(post => {
							if (user.likedPostsIDs.includes(post._id)) {
								post.liked = true;
							}
							if (user.favoritePostsIDs.includes(post._id)) {
								post.favorited = true;
							}
						});
						res.send(posts);
					})
					.catch(err => {
						res.send(err);
					});
			} else {
				res.send(posts);
			}
		})
		.catch(err => res.send(err));
});

// Get a specific post by it's ID
router.route("/post-id/:id").get((req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			post.postTime = calculateTimeDifference(post.date);

			if (req.session.authenticated) {
				User.findById(req.session.userID)
					.then(user => {
						post.liked = user.likedPostsIDs.includes(post._id);
						post.favorited = user.favoritePostsIDs.includes(post._id);
						res.send(post);
					})
					.catch(err => res.send(err));
			} else {
				res.send(post);
			}
		})
		.catch(err => res.send(err));
});

// Favorite a post
router.route("/favorite/:id").patch((req, res) => {
	if (req.session.authenticated) {
		User.findById(req.session.userID, (err, result) => {
			if (err) {
				res.send(err);
			} else {
				if (result.favoritePostsIDs.includes(req.params.id)) {
					Post.findByIdAndUpdate(req.params.id, { $inc: { favorites: -1 } })
						.then(() => {
							result
								.updateOne({
									$pull: { favoritePostsIDs: req.params.id }
								})
								.then(() => res.send("Post removed from favorites."))
								.catch(err => {
									res.send(err);
								});
						})
						.catch(err => res.send(err));
				} else {
					Post.findByIdAndUpdate(req.params.id, { $inc: { favorites: 1 } })
						.then(() => {
							result
								.updateOne({
									$push: { favoritePostsIDs: req.params.id }
								})
								.then(() => res.send("Post added to favorites."))
								.catch(err => {
									res.send(err);
								});
						})
						.catch(err => res.send(err));
				}
			}
		});
	} else {
		res.status(401).send("You need to login first.");
	}
});

// Get favorite posts
router.route("/favorites").get((req, res) => {
	if (req.session.authenticated) {
		User.findById(req.session.userID).then(user => {
			const ids = user.favoritePostsIDs;

			Post.find({ _id: { $in: ids } })
				.then(posts => {
					posts.forEach(post => {
						post.favorited = true;
						post.liked = user.likedPostsIDs.includes(post._id);
						post.postTime = calculateTimeDifference(post.date);
					});

					res.send(posts);
				})
				.catch(err => res.send(err));
		});
	} else {
		res.status(401).send("You need to login first.");
	}
});

function calculateTimeDifference(date) {
	let timeDifference = (new Date() - date) / 1000;
	if (timeDifference > 60 * 60 * 24 * 30) {
		let diff = Math.floor(timeDifference / (60 * 60 * 24 * 30));
		return diff + (diff === 1 ? " month ago" : " months ago");
	} else if (timeDifference > 60 * 60 * 24 * 7) {
		let diff = Math.floor(timeDifference / (60 * 60 * 24 * 7));
		return diff + (diff === 1 ? " week ago" : " weeks ago");
	} else if (timeDifference > 60 * 60 * 24) {
		let diff = Math.floor(timeDifference / (60 * 60 * 24));
		return diff + (diff === 1 ? " day ago" : " days ago");
	} else if (timeDifference > 60 * 60) {
		let diff = Math.floor(timeDifference / (60 * 60));
		return diff + (diff === 1 ? " hour ago" : " hours ago");
	} else if (timeDifference > 60) {
		let diff = Math.floor(timeDifference / 60);
		return diff + (diff === 1 ? " minute ago" : " minutes ago");
	} else {
		let diff = Math.floor(timeDifference);
		return diff + (diff === 1 ? " second ago" : " seconds ago");
	}
}

module.exports = router;
