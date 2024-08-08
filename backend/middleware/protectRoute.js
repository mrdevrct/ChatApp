import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN);

    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await UserModel.findOne({ _id: decode.userId }, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default protectRoute;
