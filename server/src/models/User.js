import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import passwordComplexity from "joi-password-complexity";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("users", userSchema);

export const validateUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
    username: Joi.string().required().label("username"),
  });
  return schema.validate(data);
};

export const validateUserUpdate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("email"),
    username: Joi.string().required().label("username"),
  });
  return schema.validate(data);
};

export default User;
