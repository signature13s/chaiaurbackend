import { UserModel } from "../model/user.model";
import { ApiError } from "../utils/ApirError";
import { ApiResponse } from "../utils/ApirResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadonCLoudinary } from "../utils/cloudinary";
const generateaccessTokenandRefreshToken = async (userId: any) => {
  try {
    const user = await UserModel.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      401,
      "Something went wrong while generating Access And Refresh Token"
    );
  }
};
const registerUser = asyncHandler(async (req: any, res: any) => {
  //implement the logic to resgister
  //get user details
  // validation
  // check if user already exists
  // check for image, check for avatar
  // upload image to cloudinary
  // create user object- create user entry in db
  // remove password and refresh token from the response
  //check for user creation
  // send response

  const { fullname, email, username, password } = req.body;
  if (
    [fullname, email, username, password].some(
      (field) => !field || field.toString().trim() === ""
    )
  ) {
    throw new ApiError(400, "All Fields are Required");
  }
  const existedUser = await UserModel.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with same email or username already exist");
  }
  // console.log("FIles", req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverLocalPath = req.files?.coverImage?.[0]?.path;
  // console.log(coverLocalPath);
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar Image required1");
  }

  const avatar = await uploadonCLoudinary(avatarLocalPath);

  let cover = null;

  if (coverLocalPath) {
    cover = await uploadonCLoudinary(coverLocalPath);
  }
  if (!avatar) {
    throw new ApiError(400, "Avatar Image required2");
  }

  const user = await UserModel.create({
    fullname,
    avatar: avatar.url,
    coverImage: cover?.url || "",
    email,
    username,
    password,
  });

  const createdUser = await UserModel.find(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something Went wrong while registering the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});
const loginUser = asyncHandler(async (req: any, res: any) => {
  // get data from req body
  // validate the data
  // check if user exist with email or username
  // if not exist send error response
  // if exist compare the password
  // if password is incorrect send error response
  // if password is correct generate a jwt token and send response
  console.log(req.body);

  const { username, email, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Email or username is required");
  }
  if (!password || password.toString().trim() === "") {
    throw new ApiError(400, "Password is required");
  }
  const user = await UserModel.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  const isPassword = await user.isPasswordCorrect(password);
  if (!isPassword) {
    throw new ApiError(401, "Invalid User Credentials");
  }
  const { accessToken, refreshToken } =
    await generateaccessTokenandRefreshToken(user._id);
  const loggedInUser = await UserModel.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, refreshToken },
        "User logged in successfully"
      )
    );
});
export { registerUser, loginUser };
