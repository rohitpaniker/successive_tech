const Categories = require("./../models/Categories");
const { sendJson } = require("./../lib/helpers");
const mongoose = require("mongoose");

const listAllCategories = (req, res) => {
  Categories.find({})
    .then((result) => {
      res.status(200).json({
        status: 200,
        message: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: 400,
        message: "No record found",
      });
    });
};

const createCategory = (req, res) => {
  const { name, type } = req.body;
  Categories.create({
    name,
    type,
  })
    .then((result) => {
      res.status(200).json(sendJson(200, "Category created successfuly"));
    })
    .catch((error) => {
      res
        .status(400)
        .json(
          sendJson(
            400,
            "Please make sure you are sending all required values to create the category"
          )
        );
    });
};

module.exports = {
  listAllCategories,
  createCategory,
};
