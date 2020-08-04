const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Users = require("./../models/Users");

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      Users.findOne({
        where: {
          email: jwt_payload.user,
        },
      }).then((user) => {
        if (user) {
          console.log("User found in db in passport");
          // note the return removed with passport JWT - add this return for passport local
          done(null, user);
        } else {
          console.log("User not found in db");
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  })
);
