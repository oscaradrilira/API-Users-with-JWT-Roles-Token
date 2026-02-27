
const authController = require("../Controllers/authController");
const router = require("./userRoutes");
const { autoken } = require("../middleware/authtoken");
const loginLimiter = require("../helpers/blockingRule");

// Rutas de autenticación
router.post("/login", loginLimiter, authController.loginUser); // Iniciar sesión
router.post("/logout", autoken, authController.logoutUser); // Cerrar sesión
router.post("/refresh-token", authController.validateNewAccessToken);

module.exports = router;