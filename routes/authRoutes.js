const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../helpers/jwt");
const { validateNewAccessToken } = require("../Controllers/authController");

router.post("/refresh-token", validateNewAccessToken);

export default router;