import mongoose from "mongoose";
import { validate } from "../../../utils/validation/uservalidation.js";
import bcrypt from "bcrypt";
export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (value) => validate("email", value),
      message: (props) => `${props.value} is not valid email.`,
    },
  },
  fullname: {
    firstname: {
      type: String,
      required: [true, "Firstname is required."],
      min: 3,
      max: 30,
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required."],
      min: 3,
      max: 30,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: (value) => validate("password", value),
      message:
        "Password should contain minimum eight characters, at least one letter, one number and one special character.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// hashed password

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password, (err, isMatch) => {
    if (err) return err;
    return isMatch;
  });
};
export const userModel = mongoose.model("User", userSchema);
