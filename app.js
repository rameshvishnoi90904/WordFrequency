const http = require("http");
const request = require("request");
var _ = require("lodash");
const PORT = process.env.PORT || 5000;

var express = require("express");
var app = express();
const fileUrl = "http://terriblytinytales.com/test.txt";

app.get("/:wordCount", function(req, res) {
	const n = req.params.wordCount;
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");

	request.get(fileUrl, function(error, response, body) {
		const wordArray = response.body.split(" ");
		const groupedWords = _.groupBy(wordArray);
		const wordsWithFrequency = _.map(groupedWords, function(value, key) {
			return {
				word: key,
				count: value.length
			};
		});
		wordsWithFrequency.sort(function(a, b) {
			return b.count - a.count;
		});
		res.write(JSON.stringify(wordsWithFrequency.slice(0, n)));
		res.end();
	});
});

var server = app.listen(PORT, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);
});
