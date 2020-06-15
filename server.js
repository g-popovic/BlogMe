const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json);

app.get("/", (req, res) => {
	console.log("someone visited app.get'/'");
	res.send("SUHHHH");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log("Server running on port " + port);
});
