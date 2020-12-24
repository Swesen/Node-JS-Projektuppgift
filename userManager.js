var fs = require('fs');
var bcrypt = require("bcrypt");
const { session } = require('passport');

var storeLoc = __dirname + "/private/users";

var loggedInUsers = [];

async function registerNewUser(userName, password, done) {
    if (!fs.existsSync(storeLoc + "/" + userName)) {
        fs.mkdirSync(storeLoc + "/" + userName);

        await bcrypt.hash(password, 10, (err, hash) => {
            var newUser = { password: hash }
            fs.writeFileSync(storeLoc + "/" + userName + "/user.key", JSON.stringify(newUser));
        });

        return done({});
    }
    return "Användarkonto finns redan!"
}

async function authenticateUser(userName, password, authentication) {
    if (fs.existsSync(storeLoc + "/" + userName)) {
        var currentFile = JSON.parse(fs.readFileSync(storeLoc + "/" + userName + "/user.key"));
        try {
            if (await bcrypt.compare(password, currentFile["password"])) {
                var sessionID = bcrypt.genSalt();
                loggedInUsers.push({ sessionID: sessionID, userName: userName })
                return authentication(0, sessionID, userName);
            } else {
                return authentication(1, null, null);
            }
        } catch (e) {
            return authentication(e);
        }
    }
    return authentication(2, null, null);
};

function checkAuthenticated(sessionID, userName) {
    loggedInUsers.find(user => user.sessionID === sessionID )
}
module.exports = registerNewUser, authenticateUser, checkAuthenticated;