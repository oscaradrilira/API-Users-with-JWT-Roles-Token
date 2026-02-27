const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

//IP Limiter and Detecter
// Add this if you use Heroku, AWS,Nginx o Cloudflare
// app.set('trust proxy', 1);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
