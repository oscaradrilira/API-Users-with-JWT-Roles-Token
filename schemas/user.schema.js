const { z } = require("zod");

const userSchema = z.object({
  username: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

const updateUserSchema = z.object({
  username: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  first_name: z.string().min(1, "First name is required").optional(),
  last_name: z.string().min(1, "Last name is required").optional(),
});


module.exports = { userSchema, updateUserSchema };
