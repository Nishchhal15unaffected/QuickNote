const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controller/userControllers");
const { protect } = require("../middlewares/authMiddleware");
const Router = express.Router();

Router.route("/").post(registerUser);
Router.route("/login").post(authUser);
Router.route("/profile").post(protect, updateUserProfile);
module.exports = Router;
