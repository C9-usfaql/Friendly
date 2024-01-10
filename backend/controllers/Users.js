const userModel = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const {
    firstName,
    lastName,
    image,
    dateBrith,
    phoneNumber,
    country,
    gender,
    email,
    password,
  } = req.body;
  const user = new userModel({
    firstName,
    lastName,
    image,
    dateBrith,
    phoneNumber,
    country,
    gender,
    email,
    password,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Account Created Successfully",
        author: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
            return res.status(409).json({
                success: false,
                message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const login = (req, res) =>{
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  userModel.findOne({email}).then(async (result) => {
    if(!result){
      return res.status(403).json({
        success: false,
        message: `The email doesn't exist or The password you’ve entered is incorrect`,
      });
    }

    try {
      const valid = await bcrypt.compare(password, result.password);
      if(!valid){
        return res.status(403).json({
          success: false,
          message: `The email doesn't exist or The password you’ve entered is incorrect`,
        });
      }

      const payload = {
        userId: result._id,
        author: result.firstName,
        country: result.country,
      }

      const options = {
        expiresIn : "6h"
      };

      const token = jwt.sign(payload, process.env.SECRET, options);

      res.status(200).json({
        success: true,
          message: `Valid login credentials`,
          token: token,
          userId: result._id
      });

    } catch (error) {
      throw new Error(error.message);
    }
  }).catch((err) => {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  });
};

const getUserById = (req, res)=>{
  const id = req.params.id;

  userModel.findById(id).then((result) => {
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `The User with id => ${result} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `The User ${result} `,
      user: result,
    });
  }).catch((err) => {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  });
}

module.exports = {
    register,
    login,
    getUserById,
  };
  