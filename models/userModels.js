const db = require("../config/db");
const obtenerFechaMySQL = require("../helpers/getFormatDate");

const User = {
    // Get all users
    getAll: async () => {
        const [rows] = await db.query("SELECT * FROM users");
        return rows;
    },
    // Get user by id
    getById: async (id) => {
        const [rows] = await db.query("SELECT * FROM users WHERE id_user = ?", [id]);
        return rows[0];
    },
    // Create users
    create: async (userData) => {
        const { username, email, first_name, last_name, password_hash } = userData;
        const query = "INSERT INTO users (username, email, first_name, last_name, password_hash) VALUES (?,?,?,?,?)";
        const [result] = await db.query(query, [username, email, first_name, last_name, password_hash]);
        return result.insertId;
    },
    // Update users
    update: async (id, userData) => {
        const { username, email, first_name, last_name } = userData;
        const query = "UPDATE users SET username = ?, email = ?, first_name = ?, last_name = ? WHERE id_user = ?";
        const [result] = await db.query(query, [username, email, first_name, last_name, id]);
        return result.affectedRows;
    },
    // Delete users (Soft delete)
    delete: async (id) => {
        const query = "UPDATE users SET deleted_at = ?, is_active = ? WHERE id_user = ?";
        const [result] = await db.query(query, [obtenerFechaMySQL(), false, id]);
        return result.affectedRows;
    },
    // getByEmail user
    getByEmail: async (email) => {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        return rows[0];
    },
    lastLogin: async (id) => {
        const query = "UPDATE users SET last_login_at = ? WHERE id_user = ?";
        const [result] = await db.query(query, [obtenerFechaMySQL(), id]);
        return result.affectedRows;
    }
}



module.exports = User;
