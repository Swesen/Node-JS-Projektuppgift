var express = require("express");
var fs = require("fs");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

var webpagesFolder = __dirname + "/webpages";

app.get("/", (req, res) => {
    console.log(req.ip)
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(injectTopBar(fs.readFileSync(webpagesFolder + "/index.html")));
    res.end();
});

function injectTopBar(page) {
    page = page.toString().split("%topbar%");
    return page[0] + fs.readFileSync(webpagesFolder + "/topbar.html") + page[1];
}

function buildPage(pageName) {

}

function injectHTMLelement(page, elementFileName, injectKey) {
    page = page.toString().split(injectKey);
    if (page.Length == 1) {
        return page;
    } else if (page.Length == 2) {
        return page[0] + fs.readFileSync(webpagesFolder + elementFileName) + page[1];
    }

    var errPage
    for (var i = 0; i < page.Length - 1; i++) {
        errPage = page[i] + "ERROR: Multiple injectionKeys!";
    }
    return errPage + page[page.Length - 1];
}

app.listen(8080, "0.0.0.0");