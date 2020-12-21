var fs = require('fs');

var storeLoc = __dirname + "/private/users";

// super unsecure login
module.exports = {
    checkLogin: (userName, userPassword) => {
        if (fs.existsSync(storeLoc + "/" + userName)) {
            var currentFile = JSON.parse(fs.readFileSync(storeLoc + "/" + userName + "/key.user"));
            if (currentFile["password"] === userPassword) {
                return true;
            }
        }
        return false;
    }
    ,
    registerNewUser: (userName, userPassword) => {
        if (!fs.existsSync(storeLoc + "/" + userName)) {
            fs.mkdirSync(storeLoc + "/" + userName);
            var newUser = { password: userPassword }
            fs.writeFileSync(storeLoc + "/" + userName + "/key.user", JSON.stringify(newUser));
            return "Användarkonto skapat!";
        }
        return "Användarkonto finns redan!"
    }
};