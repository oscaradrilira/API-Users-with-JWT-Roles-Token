const express = require("express");
const db = require("../config/db");

// Get all users
exports.getAllUsers = (req, res) => async () => {
  try {
    // traer de modelo
    db.query("SELECT * FROM users", (err, results) => {
      if (err) {
        console.error("Error finding users:", err);
        res.status(500).json({ error: "Error finding users" });
        return;
      }
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

//Create a new user
exports.createUser = (req, res) => async () => {
  try {
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

// Get a user by ID
exports.getUserById = (req, res) => async () => {
  try {
    res.status(200).json({ message: "User found successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

//update a user by ID
exports.updateUserById = (req, res) => async () => {
  try {
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

//delete a user by ID
exports.deleteUserById = (req, res) => async () => {
  try {
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

//login a user
exports.loginUser = (req, res) => async () => {
  try {
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error logging in user" });
  }
};

//logout a user
exports.logoutUser = (req, res) => async () => {
  try {
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error logging out user" });
  }
};
