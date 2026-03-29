import {Router} from "express"
import { changeCurrentPassword, getCurrentUser, login, logOut, refreshAccessToken, register, updateAccountDetails, updateUserCoverImage } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { isAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]),register)

router.post("/login", login)

router.get("/logout", isAuth ,logOut)

router.get("/refresh-token", isAuth, refreshAccessToken)

router.post("/change-password", isAuth, changeCurrentPassword)

router.get("/curr-user", isAuth, getCurrentUser)

router.post("/update-profile", isAuth, updateAccountDetails)

router.post(
  "/cover-image-update",
  isAuth,
  upload.single("coverImage"),
  updateUserCoverImage
);


export default router;