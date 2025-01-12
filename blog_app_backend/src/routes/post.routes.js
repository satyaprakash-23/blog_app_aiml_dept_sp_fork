import { Router } from "express";
import verifyJWTandPopulateUserDataInReq from "../middlewares/auth.middleware.js";
import { createPost, getAllPosts, getPost, getUserPosts } from "../controllers/post.controller.js";

const router = Router();

router.route("/createPost").post(verifyJWTandPopulateUserDataInReq, createPost);
router.route("/getPost/:postId").get(getPost);
router.route("/getUserPosts").get(verifyJWTandPopulateUserDataInReq, getUserPosts);
router.route("/getAllPosts").get(getAllPosts);

export default router;