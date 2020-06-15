const router = require("express").Router();
const bcrypt = require("bcrypt");
let User = require("../models/user.model");

router.route("/register").post((req, res) => {
	const username = req.body.username;
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		if (err) {
			res.send(err);
		} else {
			const newUser = new User({
				username: username,
				password: hash
			});

			newUser
				.save()
				.then(() => res.send("User created successfully."))
				.catch(err => res.send(err));
		}
	});
});

router.route("/login").post((req, res) => {
	User.findOne({ username: req.body.username }, (err, user) => {
		if (user) {
			bcrypt.compare(req.body.password, user.password, (err, result) => {
				if (result) {
					res.status(200).send("You are now logged in!");
				} else {
					res.status(401).send("Incorrect password.");
				}
			});
		} else {
			res.status(404).send("Incorrect username.");
		}
	});
});

router.route("/logout").post((req, res) => {
	res.send("Logging out...");
});

module.exports = router;
