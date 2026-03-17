import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";

const generateAccessAndRefreshTokens = async (id) => {

  try {
    const user = await User.findById(id)
  
    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()
    
    user.refreshToken = refreshToken;

    await user.save() 

    return {
      accessToken,
      refreshToken
    }
  } catch (error) {
    throw new ApiError(500, "Something went wrong")
  }

}

export const register = asyncHandler(async (req, res, next) => {
  const { email, userName, fullName, password } = req.body;


  if (
    [email, userName, fullName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (existedUser) {
    throw new ApiError(409, "userName and email or already exist");
  }

  const avatarPath = req.files?.avatar[0]?.path;
  let coverImagePath;

  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImagePath = req.files.coverImage[0].path
  }

  if (!avatarPath) {
    throw new ApiError(400, "Avatar Image is required");
  }

  const avatar = await uploadOnCloudinary(avatarPath);
  const coverImg = await uploadOnCloudinary(coverImagePath);


  if (!avatar) {
    throw new ApiError(400, "Avatar Image is required");
  }

  const user = await User.create({
    userName,
    email,
    fullName,
    password,
    avatar: avatar.url,
    coverImage: coverImg?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong user not created");
  }

  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created Successfully"));
});

export const login = asyncHandler ( async (req, res) => {

  const {email, userName, password } = req.body;

  if((!email && !userName) || !password) {
    throw new ApiError(401, "all fields are required")
  }

  const user = await User.findOne({
    $or: [
      {email},
      {userName}
    ]
  })

  if(!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isValid = await user.isPasswordCorrect(password)

  if(!isValid) {
    throw new ApiError(401, "Invalid Credintials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure: true
  }

  return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
    new ApiResponse(200, {
      user: loggedInUser,
      accessToken,
      refreshToken
    }, "Login Successfully")
  )
})

export const logOut = asyncHandler ( async (req, res) => {

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined
      }
    },
    {
      new: true
    }
  )

  const options = {
    httpOnly: true,
    secure: true
  }

  return res.status(200).
  clearCookie("accessToken", options).
  clearCookie("refreshToken", options).
  json(new ApiResponse(200, {},"Logout Successfully"))


  


})