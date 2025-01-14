import { Router } from "express";
import verifyJWTandPopulateUserDataInReq from "../middlewares/auth.middleware.js";
import { likeDislikeController } from "../controllers/likeDislike.controller.js";

const router = Router();

router.route("/likeDislike").post(verifyJWTandPopulateUserDataInReq, likeDislikeController);

export default router;