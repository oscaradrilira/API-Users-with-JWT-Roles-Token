const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

// Define routes for users
router.get("/", userController.getAllUsers);

module.exports = router;
