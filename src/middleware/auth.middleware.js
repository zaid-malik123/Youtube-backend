import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/user.model.js";

export const isAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }

    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decoded._id).select("-password -refreshToken");

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(500, "Something went wrong")
  }
};
