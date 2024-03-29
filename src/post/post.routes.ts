import { Router } from "express";
import { PostController } from "./post.controller";
import { authentication } from "../middleware/authentication";
import { validationMiddleware } from "../middleware/validation.middleware";
import { CreatePostInputDto, UpdatePostInputDto } from "./dto/PostInput.dto";

const postController = new PostController();

const router = Router();

router.post("/", authentication(), validationMiddleware(CreatePostInputDto), postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/by-user-id/:userId", postController.getPostsByUserId);
router.get("/:_id", postController.getPostById);
router.delete("/:_id", authentication(), postController.deletePost);
router.put("/:_id", authentication(), validationMiddleware(UpdatePostInputDto), postController.updatePost);

export default router;
