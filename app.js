var express = require("express");
var fs = require("fs");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("index.html")
});

app.listen(8080);