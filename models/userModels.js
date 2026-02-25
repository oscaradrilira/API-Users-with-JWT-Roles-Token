const { use } = require("react");
const db = require("../config/db"); // Import config db.js
const { obtenerFechaMySQL } = require("../helpers/getFormatDate");

const User = {
    // Get all users
    getAll: async () => {
        const query = "SELECT * FROM users";
        const [rows] = await db.query(query);
        return rows;
    },
    // Get user by id
    getById: async (id) => {
        const query = "SELECT * FROM users WHERE id = ?";
        const [rows] = await db.query(query, [id]);
        return rows[0];
    },
    // Create users
    create: async (useData) => {
        const { username, email, first_name, last_name, password_hash } = useData;
        const query = "INSERT INTO users (username, email, first_name, last_name, password_hash) VALUES (?,?,?,?,?)";
        const [result] = await db.query(query, [username, email, first_name, last_name, password_hash]);
        return result.insertId;

    },
    // Update users
    update: async (id, useData) => {
        const { username, email, first_name, last_name, password_hash } = useData;
        const query = "UPDATE users SET username = ?, email = ?, first_name = ?, last_name = ?, password_hash = ? WHERE id = ?";
        const [result] = await db.query(query, [username, email, first_name, last_name, password_hash, id]);
        return result.affectedRows;
    },
    // Delete users
    delete: async (id) => {
        const query = "UPDATE users SET deleted_at = ?, is_active = ? WHERE id = ?";
        const [result] = await db.query(query, [obtenerFechaMySQL(), false, id]);
        return result.affectedRows;
    },
    // Login users
    login: async (email, password_hash) => {
        const query = "SELECT * FROM users WHERE email = ? AND password_hash = ?";
        const [rows] = await db.query(query, [email, password_hash]);
        return rows[0];
    }
}

module.exports = User; // Export object User

