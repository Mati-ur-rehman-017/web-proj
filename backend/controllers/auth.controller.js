import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();

    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    // console.log("herer");

    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));
    

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );
    // console.log("herer");

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
export const update = async (req, res, next) => {
  try {
    console.log(req);
    const userId = req.user.id; // Assuming `req.user` is populated by a middleware that verifies the JWT token.
    const updates = req.body;

    // If password is being updated, hash the new password
    if (updates.password) {
      updates.password = bcrypt.hashSync(updates.password, 5);
    }

    // Update user in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return next(createError(404, "User not found!"));
    }

    const { password, ...info } = updatedUser._doc; // Exclude the password from the response
    res.status(200).send(info);
  } catch (err) {
    next(err);
  }
};

