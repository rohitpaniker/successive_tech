const mongoose = require("mongoose");
const models = {};

const DB = process.env.MONGODB_URL || "";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connnection successful!"));

module.exports = models;
