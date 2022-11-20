// import { logError } from "../util/logging.js";
import User from "../models/User.js";
import Joi from "joi";
import bcryptjs from "bcryptjs";

export const authenticate = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email" });
    }

    const validPassword = await bcryptjs.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).send({ message: "Password is incorrect" });
    }

    const token = user.generateAuthToken();
    return res.status(200).send({
      id: user._id,
      data: token,
      email: user.email,
      username: user.username,
      success: true,
      message: "Logged In",
    });

    // generate this token and send this information after a successful sign up also
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("email"),
    password: Joi.string().required().label("password"),
  });
  return schema.validate(data);
};
