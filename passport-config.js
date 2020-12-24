// https://www.youtube.com/watch?v=-RCnNyD0L-s
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");
var fs = require("fs");

var storeLoc = __dirname + "/private/users";

function initialize(passport) {
    var authenticateUser = async (userName, password, done) => {
        if (fs.existsSync(storeLoc + "/" + userName)) {
            var currentFile = JSON.parse(fs.readFileSync(storeLoc + "/" + userName + "/user.key"));
            try {
                if (await bcrypt.compare(password, currentFile["password"])) {
                    return done(null, userName);
                } else {
                    return done(null, false, { message: "Fel lösenord" });
                }
            } catch (e) {
                return done(e);
            }
        }
        return done(null, false, { message: "Användare finns ej" });
    };
    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => done(null, getUserById(id)));
}

module.exports = initialize;