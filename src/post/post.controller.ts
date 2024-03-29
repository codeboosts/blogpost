import { Response } from "express";
import { PostService } from "./post.service";

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  createPost = async (req: RequestType, res: Response) => {
    try {
      const result = await this.postService.createPost(req.body, req.currentUser._id);
      res.json(result);
    } catch (error) {
      res.status(error.status ?? 500).json({ error: error.message });
    }
  };

  getAllPosts = async (req: RequestType, res: Response) => {
    try {
      const result = await this.postService.getAllPosts();
      res.json(result);
    } catch (error) {
      res.status(error.status ?? 500).json({ error: error.message });
    }
  };

  getPostsByUserId = async (req: RequestType, res: Response) => {
    try {
      const result = await this.postService.getPostsByUserId(req.params.userId);
      res.json(result);
    } catch (error) {
      res.status(error.status ?? 500).json({ error: error.message });
    }
  };

  getPostById = async (req: RequestType, res: Response) => {
    try {
      const result = await this.postService.getPostById(req.params._id);
      res.json(result);
    } catch (error) {
      res.status(error.status ?? 500).json({ error: error.message });
    }
  };
  deletePost = async (req: RequestType, res: Response) => {
    try {
      const result = await this.postService.deletePost(req.params._id, req.currentUser._id);
      res.json(result);
    } catch (error) {
      res.status(error.status ?? 500).json({ error: error.message });
    }
  };
  updatePost = async (req: RequestType, res: Response) => {
    try {
      const result = await this.postService.updatePost(req.body, req.params._id, req.currentUser._id);
      res.json(result);
    } catch (error) {
      res.status(error.status ?? 500).json({ error: error.message });
    }
  };
}
