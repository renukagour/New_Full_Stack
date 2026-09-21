import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
//just before registerUser because is the middleware
router.route("/register").post(
  upload.fields([
    {
    name:"avatar",
    maxCount:1
  },
  {
    name:"coverImage",
    maxCount:1
  }
]), //accept multiple files
  registerUser
);

export default router;
