import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  logOutUser,
  loginUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
//just before registerUser because is the middleware
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]), //accept multiple files
  registerUser
);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/get-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

//taking data from params
router.route("/channel/:username").get(verifyJWT, getUserChannelProfile);

router.route("/history").get(verifyJWT, getWatchHistory);

export default router;
