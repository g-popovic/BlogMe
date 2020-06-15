const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log("Server running on port " + port);
});
