import express from "express";
import * as userController from "../Controllers/userController.js";

import express from "express";
import * as userController from "../Controllers/userController.js";

const { autoken } = require("../middleware/authtoken");

const router = express.Router();

// Rutas para usuarios
router.get("/", autoken, userController.getAllUsers); // Obtener todos los usuarios
router.post("/", userController.createUser); // Crear un nuevo usuario (Registro)
router.get("/:id", autoken, userController.getUserById); // Obtener usuario por ID
router.put("/:id", autoken, userController.updateUserById); // Actualizar usuario por ID
router.delete("/:id", autoken, userController.deleteUserById); // Eliminar usuario por ID

// Rutas de autenticación
router.post("/login", userController.loginUser); // Iniciar sesión
router.post("/logout", autoken, userController.logoutUser); // Cerrar sesión

export default router;
