const express = require("express");
const db = require("../config/db");
const User = require("../models/userModels");
const { comparePassword } = require("../helpers/password_hash");

// Get all users
exports.getAllUsers = (req, res) => async () => {
  try {
    const users = await User.getAll();
    res.status(200).json(users); // return users and status 200 (OK)
    // traer de modelo
    // db.query("SELECT * FROM users", (err, results) => {
    //   if (err) {
    //     console.error("Error finding users:", err);
    //     res.status(500).json({ error: "Error finding users" });
    //     return;
    //   }
    //   res.status(200).json(results);
    // });
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" }); // return error and status 500 (Internal Server Error)
  }
};

//Create a new user
// riceve body username, email, first_name, last_name, password
exports.createUser = (req, res) => async () => {
  try {
    const { username, email, first_name, last_name, password } = req.body;
    const password_hash = await hashPassword(password);
    // add password_hash to body
    req.body.password = password_hash;
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
// riceve id
exports.getUserById = (req, res) => async () => {
  try {
    const { id } = req.params
    const user = await User.getById(id)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

//update a user by ID
// riceve id and body
exports.updateUserById = (req, res) => async () => {
  try {
    const { id } = req.params;
    const { username, email, first_name, last_name } = req.body;
    const updateData = {
      username,
      email,
      first_name,
      last_name,
    }
    const user = await User.update(id, updateData);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

//delete a user by ID
// riceve id
exports.deleteUserById = (req, res) => async () => {
  try {
    const { id } = req.params;
    const user = await User.delete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

//login a user
// riceve email e password
exports.loginUser = (req, res) => async () => {
  try {
    const { password } = req.body;
    const user = await User.getByEmail(req.body.email);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const isPasswordValid = await comparePassword(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

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
