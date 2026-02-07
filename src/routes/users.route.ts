import { Router } from "express";
import resgisterUser from "../controller/user.controller";
const router = Router();
router.route("/register").post(resgisterUser);
// router.route("/login").post(resgisterUser);
export default router;
