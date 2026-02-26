const db = require("../config/db");
const User = require("../models/userModels");
const { hashPassword, comparePassword } = require("../helpers/password_hash");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, first_name, last_name, password } = req.body;
    const password_hash = await hashPassword(password);

    const newUserData = {
      username,
      email,
      first_name,
      last_name,
      password_hash
    };

    await User.create(newUserData);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.getById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, first_name, last_name } = req.body;
    const updateData = {
      username,
      email,
      first_name,
      last_name,
    };
    await User.update(id, updateData);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    await User.delete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

// Placeholder logic for login/logout (normally in authController)
exports.loginUser = async (req, res) => {
  res.status(501).json({ message: "Login logic should be in authController" });
};

exports.logoutUser = async (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};
