const Users = require("./../models/Users");
const { validatePassword, genPassword, sendJson } = require("./../lib/helpers");
const jwt = require("jsonwebtoken");

const Status = (req, res) => {
  return res.status(200).json({
    status: 200,
    message: "Status Running",
  });
};

const Register = (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = genPassword(password);

  Users.findOne({
    email,
  })
    .then((result) => {
      if (result && result._id)
        return res
          .status(200)
          .json(sendJson(400, "Sorry, please use some other email id"));

      const UserData = new Users({
        email,
        hash: hashedPassword,
      });

      UserData.save()
        .then((result) => {
          return res.status(200).json(sendJson(200, "Successfuly registered"));
        })
        .catch((error) => {
          console.log("UCE37 >>>>>>>>>>> ", error);
          return res
            .status(400)
            .json(
              sendJson(
                400,
                "Please make sure you are sending email and password."
              )
            );
        });
    })
    .catch((error) => {
      console.log("UCE42 >>>>>>>>>>> ", error);
      return res.status(400).json(sendJson(400, "Something Went Wrong"));
    });
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });

  console.log(user);

  if (!user) {
    return res.status(400).json(sendJson(400, "User not found"));
  }

  const validate = await validatePassword(user.hash, password);

  if (!validate) {
    return res.status(400).json(sendJson(400, "Password do not match"));
  }

  const JWTToken = jwt.sign({ user }, process.env.JWT_SECRET);
  return res.status(400).json(sendJson(200, { token: JWTToken }));
};

module.exports = {
  Status,
  Register,
  Login,
};
