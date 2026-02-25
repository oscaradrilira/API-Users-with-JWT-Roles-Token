import bcrypt from "bcrypt";

// Middleware to hash the password before saving to the database
const SALT_ROUNDS = 10; // Number of rounds for hashing

export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

// Middleware to compare the provided password with the hashed password in the database
export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error("Error comparing password");
  }
};
