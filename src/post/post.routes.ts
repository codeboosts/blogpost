import { Router } from "express";
import { PostController } from "./post.controller";


const router = Router();
const postController = new PostController();


router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/by-user-id/:userId', postController.getPostsByUserId);
router.get('/:_id', postController.getPostById);
router.delete('/:_id', postController.deletePost);
router.put('/:_id', postController.updatePost);



export default router