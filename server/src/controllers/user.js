import bcryptjs from "bcryptjs";
import User, {
  validateUser,
  validateUserUpdate,
  validatePasswordUpdate,
} from "../models/User.js";
import { logError } from "../util/logging.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get users, try again later" });
  }
};

// Find One user
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.status(200).json({
      success: true,
      result: {
        userID: user._id,
        username: user.username,
        email: user.email,
        symScore: user.symScore,
        dateCreated: user.dateCreated,
      },
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get user, try again later" });
  }
};

// Find One user
export const getPublicUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.status(200).json({
      success: true,
      result: {
        username: user.username,
        symScore: user.symScore,
        dateCreated: user.dateCreated,
      },
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get user, try again later" });
  }
};

// Find Taggers
export const getTaggers = async (req, res) => {
  const { taggersID } = req.body;

  try {
    const taggers = [];
    for (let i = 0; i < taggersID.length; i++) {
      const user = await User.findOne({ _id: taggersID[i] });
      const tagger = {
        username: user.username,
      };
      taggers.push(tagger);
    }

    res.status(200).json({
      success: true,
      result: taggers,
    });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get taggers, try again later" });
  }
};

// Update One User
export const updateUser = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "The user does not exist",
      });
    }

    if (req.body.user) {
      user.username = req.body.user.username
        ? req.body.user.username
        : user.username;
      user.email = req.body.user.email
        ? req.body.user.email.toLowerCase()
        : user.email;
      user.password = req.body.user.password
        ? req.body.user.password
        : user.password;
      user.SALT = req.body.user.SALT ? req.body.user.SALT : user.SALT;
      user.symScore = req.body.user.symScore
        ? req.body.user.symScore
        : user.symScore;
    }

    const hashPasswordCurrent = await bcryptjs.hash(
      req.body.password.currentPassword,
      user.SALT
    );

    if (
      hashPasswordCurrent === user.password &&
      req.body.password.newPassword !== req.body.password.currentPassword
    ) {
      const saltNew = await bcryptjs.genSalt(Number(process.env.SALT));
      const hashNewPassword = await bcryptjs.hash(
        req.body.password.newPassword,
        saltNew
      );
      user.password = hashNewPassword;
      user.SALT = saltNew;
    } else {
      return res.status(400).send({
        message:
          req.body.password.newPassword === req.body.password.currentPassword
            ? "Your new password cannot be the same as your current one."
            : "The password you entered is incorrect, please enter your current password correctly.",
      });
    }

    const userToValidate = {
      username: user.username,
      email: user.email,
    };

    const passwordToValidate = {
      password: req.body.password.newPassword,
    };

    const { error } = req.body.password
      ? validatePasswordUpdate(passwordToValidate)
      : validateUserUpdate(userToValidate);

    if (error) {
      return res.status(400).send({
        message: `${error.details[0].message}`,
      });
    }

    await user.save();

    res.status(200).json({
      message: req.body.password
        ? "Your password was successfully changed"
        : "Your account was successfully updated",
      success: true,
      result: {
        username: user.username,
        email: user.email,
        symScore: user.symScore,
      },
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      message: "Unable to update the profile, try again later",
    });
  }
};

// Update Sym Score
export const updateSymScore = async (req, type, auth, exp) => {
  const body = { ...req?.body };
  try {
    let user;
    let author;
    switch (type) {
      case "statement":
        user = await User.findOne({ _id: body.statement.userID });
        user.symScore = user.symScore + 2;
        await user.save();
        break;
      case "comment":
        user = await User.findOne({ _id: body.comment.userID });
        author = await User.findOne({ _id: body.comment.authorID });
        user.symScore = user.symScore + 1;
        author.symScore = author.symScore + 1;
        await user.save();
        await author.save();
        break;
      case "expired":
        user = await User.findOne({ _id: auth });
        user.symScore = user.symScore + exp;
        await user.save();
        break;
      default:
        user = await User.findOne({ _id: body.statement.userID });
        user.symScore = user.symScore + 2;
        await user.save();
        break;
    }

    // res.status(200).json({
    //   message: "User symScore updated successfully",
    //   success: true,
    //   result: {
    //     symScore: user.symScore,
    //   },
    // });
  } catch (error) {
    // logError(error);
    // res.status(500).json({
    //   success: false,
    //   message: "Unable to update the symScore, try again later",
    // });
  }
};

// Delete One User
export const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Profile was successfully deleted",
      isDelete: true,
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      message: "Unable to delete profile, try again later",
    });
  }
};

// Create user
export const createUser = async (req, res) => {
  try {
    const { user } = req.body;
    if (typeof user !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user
        )}`,
      });
    }

    const email = await User.findOne({ email: user.email });
    const username = await User.findOne({ username: user.username });
    if (email || username) {
      return res
        .status(409)
        .send({ message: "A user with that email/username already exists!" });
    }
    const { error } = validateUser(user);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const salt = await bcryptjs.genSalt(Number(process.env.SALT));
    const hashPassword = await bcryptjs.hash(user.password, salt);

    const newUser = await new User({
      ...user,
      password: hashPassword,
      SALT: salt,
    });
    await newUser.save();
    const token = newUser.generateAuthToken();
    res.status(201).send({
      message: "User created successfully",
      success: true,
      result: { userID: newUser._id, token },
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "internal server error while creating user" });
  }
};
