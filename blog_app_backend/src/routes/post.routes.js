import { Router } from "express";
import verifyJWTandPopulateUserDataInReq from "../middlewares/auth.middleware.js";
import { createPost, getAllPosts, getPost, getUserPosts } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/createPost").post(verifyJWTandPopulateUserDataInReq, upload.single("poster"), createPost);
router.route("/getPost/:postId").post(getPost);
router.route("/getUserPosts").get(verifyJWTandPopulateUserDataInReq, getUserPosts);
router.route("/getAllPosts").get(getAllPosts);

export default router;