
const { validateNewAccessToken } = require("../Controllers/authController");
const router = require("./userRoutes");

router.post("/refresh-token", validateNewAccessToken);

module.exports = router;