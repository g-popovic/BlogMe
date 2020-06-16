const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const session = require("express-session");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false
	})
);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("Connection to MongoDB established successfully");
});

app.use("/posts/", postsRoutes);
app.use("/user/", userRoutes);

// Test authentication
app.get("/profile", (req, res) => {
	if (req.session.authenticated) {
		res.send("Welcome aboard, captain. All systems online. ID: " + req.session.username);
	} else {
		res.send("Access denied.");
	}
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log("Server running on port " + port);
});
