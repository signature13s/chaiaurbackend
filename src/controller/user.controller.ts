import { asyncHandler } from "../utils/asyncHandler";

const resgisterUser = asyncHandler(async (req: any, res: any) => {
  res.status(200).json({
    message: "Ok",
  });
});
export default resgisterUser;
