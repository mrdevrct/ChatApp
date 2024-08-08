import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (!fullname.trim()) {
      return res.status(400).json({ message: "Fullname is required" });
    }

    if (!username.trim()) {
      return res.status(400).json({ message: "Username is required" });
    }

    if (!password.trim()) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (!confirmPassword.trim()) {
      return res.status(400).json({ message: "Confirm password is required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (gender && !["male", "female"].includes(gender.trim().toLowerCase())) {
      return res.status(400).json({ message: "Invalid gender" });
    }

    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "username already exists !!!" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await UserModel.create({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePictur: gender === "male" ? boyProfile : girlProfile,
    });

    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      profilePictur: newUser.profilePictur,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username.trim()) {
      return res.status(400).json({ message: "Username is required" });
    }

    if (!password.trim()) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "username or password not correct!" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePictur: user.profilePictur,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "user logout successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
