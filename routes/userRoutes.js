const express = require("express");
const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");
const { autoken } = require("../middleware/authtoken");

const router = express.Router();

// Rutas para usuarios
router.get("/", autoken, userController.getAllUsers); // Obtener todos los usuarios
router.post("/", autoken, userController.createUser); // Crear un nuevo usuario (Registro)
router.get("/:id", autoken, userController.getUserById); // Obtener usuario por ID
router.put("/:id", autoken, userController.updateUserById); // Actualizar usuario por ID
router.delete("/:id", autoken, userController.deleteUserById); // Eliminar usuario por ID

// Rutas de autenticación
router.post("/login", authController.loginUser); // Iniciar sesión
router.post("/logout", autoken, authController.logoutUser); // Cerrar sesión

module.exports = router;