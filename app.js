var express = require("express");
var fs = require("fs");
var url = require("url");
var userManager = require("./userManager");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

var webpagesFolder = __dirname + "/webpages";

var loggedInUsers = [];

// public pages
app.get("/*", (req, res) => {
    // get the url path name
    var urlPath = url.parse(req.url, true).pathname;

    // redirect
    switch (urlPath) {
        case "/":
            urlPath = "/home"
            break;
        default:
            break;
    }

    res.sendFile(webpagesFolder + urlPath + ".html", (err) => {
        if (err) {
            res.status(err.status).end();
        }
    });

});

app.post('/login', (req, res) => {
    userManager.authenticateUser(req.body.userName, req.body.password, (err, sessionID, userName) => {

    });
});

app.post("/registerNew", async (req, res) => {
    var userName = req.body.userName;
    var password = req.body.password;

    console.log("Register try: Username: " + userName + ", Pass: " + password);
    var registered = await userManager.registerNewUser(userName, password);

    console.log("Register successfull: " + registered);
    res.redirect("/login");
});

app.listen(8080, "0.0.0.0");