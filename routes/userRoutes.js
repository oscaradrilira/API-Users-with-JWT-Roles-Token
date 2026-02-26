const express = require("express");
const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");

const router = express.Router();

// Rutas para usuarios
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);

// Rutas de autenticación
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

module.exports = router;
