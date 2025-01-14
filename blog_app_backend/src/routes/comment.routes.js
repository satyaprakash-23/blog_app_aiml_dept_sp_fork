import { Router } from "express";
import verifyJWTandPopulateUserDataInReq from "../middlewares/auth.middleware.js";
import { addComment } from "../controllers/comment.controller.js";

const router = Router();

router
  .route("/addComment")
  .post(verifyJWTandPopulateUserDataInReq, addComment);

export default router;