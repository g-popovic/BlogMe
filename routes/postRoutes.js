const router = require("express").Router();
let Post = require("../models/post.model");
let User = require("../models/user.model");

// Add a new post
router.route("/new-post").post((req, res) => {
	const newPost = Post({
		// TODO: Change placeholder.user to req.session.username
		username: "placeholder.username",
		title: req.body.title,
		content: req.body.content,
		date: new Date()
	});

	newPost
		.save()
		.then(() => res.send("Post added successfully."))
		.catch(err => res.send(err));
});

// Like a post
router.route("/like/:id").patch((req, res) => {
	Post.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: 1 } })
		.then(() => res.send("Liked post."))
		.catch(err => res.send(err));
});

// Post a comment
router.route("/new-comment/:postId").post((req, res) => {
	Post.findOneAndUpdate(
		{ _id: req.params.postId },
		{
			// TODO: Change placeholder.user to req.session.username
			$push: { comments: { author: "placeholder.user", content: req.body.content } }
		}
	)
		.then(() => res.send("Added comment."))
		.catch(err => res.send(err));
});

// Get all posts
router.route("/all").get((req, res) => {
	Post.find()
		.then(posts => res.send(posts))
		.catch(err => console.log(err));
});

// Get a specific post by it's ID
router.route("/post-id/:id").get((req, res) => {
	Post.findById(req.params.id)
		.then(post => res.send(post))
		.catch(err => console.log(err));
});

// Increment the post favorites
// Add post's ID to user favorites field
router.route("/favorite/:id").patch((req, res) => {
	User.findById(req.body.userId, (err, result) => {
		if (err) {
			res.send(err);
		} else {
			console.log(result.favoritePostsIDs);
			if (!result.favoritePostsIDs.includes(req.params.id)) {
				Post.findByIdAndUpdate(req.params.id, { $inc: { favorites: 1 } })
					.then(() => {
						// TODO: Change req.body.userId to req.session.userId
						result
							.update({
								$push: { favoritePostsIDs: req.params.id }
							})
							.then(() => res.send("Post added to favorites."))
							.catch(err => {
								res.send(err);
							});
					})
					.catch(err => res.send(err));
			} else {
				res.send("Cant favorite post: post is already in favorites.");
			}
		}
	});
});

router.route("/unfavorite/:id").patch((req, res) => {
	User.findById(req.body.userId, (err, result) => {
		if (err) {
			res.send(err);
		} else {
			console.log(result.favoritePostsIDs);
			if (result.favoritePostsIDs.includes(req.params.id)) {
				Post.findByIdAndUpdate(req.params.id, { $inc: { favorites: -1 } })
					.then(() => {
						// TODO: Change req.body.userId to req.session.userId
						result
							.update({
								$pull: { favoritePostsIDs: req.params.id }
							})
							.then(() => res.send("Post removed from favorites."))
							.catch(err => {
								res.send(err);
							});
					})
					.catch(err => res.send(err));
			} else {
				res.send("Cant unfavorite post: post isn't in favorites.");
			}
		}
	});
});

// Get favorite posts

router.route("/favorites").get((req, res) => {
	// TODO: Change req.body.userId to req.session.userId
	User.findById(req.body.userId).then(user => {
		const ids = user.favoritePostsIDs;

		Post.find({ _id: { $in: ids } })
			.then(posts => res.send(posts))
			.catch(err => res.send(err));
	});
});

module.exports = router;
