const bCrypt = require("bcryptjs");

validatePassword = (passwordHash, plainTextPassword) => {
  return bCrypt.compareSync(plainTextPassword, passwordHash);
};

genPassword = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

sendJson = (status, message) => {
  return {
    status,
    message,
  };
};

module.exports = { validatePassword, genPassword, sendJson };
