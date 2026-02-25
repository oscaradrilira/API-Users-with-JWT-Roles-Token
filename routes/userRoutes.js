import express from "express";
import * as userController from "../Controllers/userController.js";

const router = express.Router();

// Rutas para usuarios
router.get("/", userController.getAllUsers);           // Obtener todos los usuarios
router.post("/", userController.createUser);          // Crear un nuevo usuario (Registro)
router.get("/:id", userController.getUserById);       // Obtener usuario por ID
router.put("/:id", userController.updateUserById);    // Actualizar usuario por ID
router.delete("/:id", userController.deleteUserById); // Eliminar usuario por ID

// Rutas de autenticación
router.post("/login", userController.loginUser);      // Iniciar sesión
router.post("/logout", userController.logoutUser);    // Cerrar sesión

export default router;

