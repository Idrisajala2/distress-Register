const express = require("express");
const myRoter = express.Router();
const upload = require("../utils/multer");
const {
  createUser,
  getAllUser,
  getUser,
  deleteSingleUser,
  updateSingleUser,
  signInUser,
} = require("../controller/userController");

myRoter.route("/register").post(upload, createUser);
myRoter.route("/user").get(getAllUser);
myRoter
  .route("/user/:id")
  .get(getUser)
  .patch(updateSingleUser)
  .delete(upload, deleteSingleUser);
myRoter.route("/sign").post(signInUser);

module.exports = myRoter;
