const mongoose = require("mongoose");

const Products = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  make: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Products", Products);
