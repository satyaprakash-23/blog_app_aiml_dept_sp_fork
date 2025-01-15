import { Router } from "express";
import verifyJWTandPopulateUserDataInReq from "../middlewares/auth.middleware.js";
import { addComment, getPostComments } from "../controllers/comment.controller.js";

const router = Router();

router
  .route("/addComment")
  .post(verifyJWTandPopulateUserDataInReq, addComment);

router
  .route("/getPostComments/:postId")
  .get(verifyJWTandPopulateUserDataInReq ,getPostComments);

export default router;