const passport = require("passport");

const secureCheckPointMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    let token =
      req.headers["Authorization"] || req.headers["authorization"] || false; // Express headers are auto converted to lowercase
    if (!token)
      return res.status(400).json({ error: "Auth token is not supplied" });

    token = token.replace(/"/g, "").toString().replace(/["']/g, "").toString();

    if (token && token.startsWith("JWT")) {
      // Remove Bearer from string
      token = token.slice(4, token.length);
    } else {
      return res.status(400).json({ error: "Auth token is not supplied" });
    }

    if (err) {
      return res.status(400).json({ error: err });
    } else if (info != undefined) {
      return res.status(400).json({ error: info.message });
    } else {
      next();
    }
  })(req, res, next);
};

module.exports = {
  secureCheckPointMiddleware,
};
