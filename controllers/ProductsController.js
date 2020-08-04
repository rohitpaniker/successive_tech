const Users = require("./../models/Users");
const Categories = require("./../models/Categories");
const Products = require("./../models/Products");
const { sendJson } = require("./../lib/helpers");
const mongoose = require("mongoose");

const listAllProducts = (req, res) => {
  Products.find()
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

const getAllProductsByCat = (req, res) => {
  let searchWhat;
  if (req.query.search) {
    searchWhat = req.query.search;
  } else {
    return res.status(400).json({
      status: 400,
      message: "Invalid query search",
    });
  }

  Categories.findOne({
    $or: [
      {
        name: searchWhat,
      },
      {
        type: searchWhat,
      },
    ],
  })
    .then((result) => {
      if (!result._id)
        res.status(400).send(sendJson(400, "Sorry, can't find cateogry"));
      Products.find({
        category: mongoose.Types.ObjectId(result._id),
      })
        .then((result) => {
          res.status(200).send(sendJson(200, result));
        })
        .catch((error) => {
          res.status(400).send(sendJson(400, "Sorry, can't find products"));
        });
    })
    .catch((error) => {
      res.status(400).send(sendJson(400, "Sorry, can't find cateogry"));
    });
};

const addToCart = (req, res) => {
  const { userid, productids } = req.body;

  Users.findOne({
    _id: mongoose.Types.ObjectId(userid),
  })
    .then(async (result) => {
      if (!result._id) {
        return res.status(400).json(sendJson(400, "User not found"));
      }

      let _tempUserCart;

      const result_usercart = await result.usercart.map((x) => x.toString());

      let diff_arr = result_usercart.filter((x) => !productids.includes(x));

      if (result_usercart.length === 0 || diff_arr.length > 0) {
        _tempUserCart =
          result_usercart.length === 0
            ? productids
            : [...result_usercart, ...diff_arr];

        Users.updateOne(
          {
            _id: mongoose.Types.ObjectId(userid),
          },
          {
            usercart: _tempUserCart,
          },
          {
            multi: false,
            upsert: false,
            new: false,
          }
        )
          .then((result) => {
            res.status(200).json(sendJson(200, "Product added to cart"));
          })
          .catch((error) => {
            res
              .status(400)
              .json(
                sendJson(
                  400,
                  "Something went wrong. Unable to add product to the cart, please try again later."
                )
              );
          });
      } else {
        res.status(400).json(sendJson(400, "Product is already in the cart"));
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .json(sendJson(400, "Something wen wrong. Make sure user exists."));
    });
};

const getCartByUser = (req, res) => {
  const { userid } = req.body;

  Users.findOne({
    _id: mongoose.Types.ObjectId(userid),
  })
    .then((result) => {
      if (!result._id) {
        return res.status(400).json(sendJson(400, "User doesn't exist"));
      } else {
        Products.find({
          _id: {
            $in: [result.usercart],
          },
        })
          .then((result) => {
            return res.status(200).json(sendJson(200, result));
          })
          .catch((error) => {
            return res
              .status(400)
              .json(sendJson(400, "Nothing in there in the cart"));
          });
      }
    })
    .catch((error) => {
      return res
        .status(400)
        .json(
          sendJson(
            400,
            "Something went wrong, please make sure you are sending userid"
          )
        );
    });
};

const createProduct = (req, res) => {
  const { name, category, description, price, make } = req.body;
  // 5f29918721fa71df296de879
  Categories.findOne({
    _id: mongoose.Types.ObjectId(category),
  })
    .then((result) => {
      if (!result._id) {
        return res
          .status(400)
          .json(
            sendJson(
              400,
              "Please make sure category exists before assigning a product to a non-existing category"
            )
          );
      } else {
        Products.create({
          name,
          category: mongoose.Types.ObjectId(category),
          description,
          price: parseFloat(price),
          make: parseInt(make),
        })
          .then((result) => {
            res.status(200).json(sendJson(200, "Product created successfuly"));
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
      }
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
  listAllProducts,
  getAllProductsByCat,
  addToCart,
  getCartByUser,
  createProduct,
};
