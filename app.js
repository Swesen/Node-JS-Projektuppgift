var express = require("express");
var fs = require("fs");
const { hostname } = require("os");
var url = require("url");
var pageBuilder = require("./pageBuilder");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

var webPageNavbar = "./pageBlocks/navbar.html";

app.get("/*", (req, res) => {
    var urlPath = url.parse(req.url, true).pathname;

    pageBuilder.addToHead('<meta charset="utf-8"/><link rel="stylesheet" href="/css/style.css"></link>');

    pageBuilder.addBlockToBody(webPageNavbar);

    switch (urlPath) {
        case "/":
            pageBuilder.addToHead('<title>Länklådan</title><link rel="script" href="/JS/homed.js"></link>');
            pageBuilder.addBlockToBody("./pageBlocks/links.html")
            var linkList = fs.readFileSync("./link.lis").toString().split("\n");
            var unorderedList = "<ul>"
            for (let i = 0; i < linkList.length - 1; i++) {
                var parsedLink = JSON.parse(linkList[i]);
                unorderedList += '<li>' + '<a target="_blank" href="' + parsedLink.link + '">' + parsedLink.title + ' - <img src="http://' + url.parse(parsedLink.link).hostname + '/favicon.ico" alt="/link.png" onerror="this.src=this.alt">' +  '</a></li>';
            }
            unorderedList += "</ul>"
            pageBuilder.bodyInsertAtKey("%linkList%", unorderedList);
            break;
        case "/post":
            pageBuilder.addToHead('<title>Lägg till länk - Länklådan</title><link rel="script" href="/JS/post.js"></link>');
            pageBuilder.addBlockToBody("./pageBlocks/postform.html")

            break;
        default:
            res.sendStatus(404);
            pageBuilder.clearPage();
            return;
    }

    res.send(pageBuilder.buildPage()).end();

});

app.post("/post", (req, res) => {
    var link = { title: req.body.title, link: req.body.link };
    console.log(link.title + ", länk: " + link.link);
    console.log(link);
    fs.appendFileSync("./link.lis", JSON.stringify(link) + "\n");
    res.redirect("/post");
});

app.listen(8080, "0.0.0.0");