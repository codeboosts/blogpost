import { Router } from "express";
import { CommentController } from "./comment.controller";
import { authentication } from "../middleware/authentication";


const router = Router();
const commentController = new CommentController()


router.post("/",  authentication(),commentController.createComment);
router.get("/:postId",  authentication(),commentController.getCommentsByPostId);
router.get("/replies/:_id",  authentication(),commentController.getReplies);
router.delete("/:_id",  authentication(),commentController.deleteComment);
router.put("/:_id",  authentication(),commentController.updateComment);


export default router