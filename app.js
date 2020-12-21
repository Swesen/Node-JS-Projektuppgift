var express = require("express");
var fs = require("fs");
var url = require("url");
var userManager = require("./userManager");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

var webpagesFolder = __dirname + "/webpages";

app.get("/*", (req, res) => {
    console.log(req.ip)
    var urlPath = url.parse(req.url, true).pathname;

    switch (urlPath) {
        case "/":
            urlPath = "/home"
            break;
        default:
            break;
    }

    res.sendFile(webpagesFolder + urlPath + ".html", (err) => {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log("Serving : '" + urlPath + "'");
        }
    });

});

app.post("/authenticate", (req, res) => {
    var uname = req.body.uname;
    var psw = req.body.psw;

    console.log("Login try: Username: " + uname + ", Pass: " + psw);
    var authenticated = userManager.checkLogin(uname, psw);

    res.write("Auth: " + authenticated);
    res.end();
});

app.post("/registerNew", (req, res) => {
    var uname = req.body.uname;
    var psw = req.body.psw;

    console.log("Register try: Username: " + uname + ", Pass: " + psw);
    var registered = userManager.registerNewUser(uname, psw);

    console.log("Register successfull: " + registered);
    res.redirect("/login");
});

// function injectHTMLelement(page, elementFileName, injectKey) {
//     page = page.toString().split(injectKey);
//     if (page.Length == 1) {
//         return page;
//     } else if (page.Length == 2) {
//         return page[0] + fs.readFileSync(webpagesFolder + elementFileName) + page[1];
//     }

//     var errPage
//     for (var i = 0; i < page.Length - 1; i++) {
//         errPage = page[i] + "ERROR: Multiple injectionKeys!";
//     }
//     return errPage + page[page.Length - 1];
// }

app.listen(8080, "0.0.0.0");