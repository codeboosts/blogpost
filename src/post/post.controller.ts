import { Response } from "express";
import { PostService } from "./post.service";

export class PostController {
  private readonly postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  async createPost(req: RequestType, res: Response) {
    try {
      const result = await this.postService.createPost(req.body, req.currentUser._id);
      res.json(result);
    } catch (error) {
      res.status(error.status ?? 500).json({ error: error.message });
    }
  }

  async getAllPosts(req: RequestType, res: Response) {
    try {
      const result = await this.postService.getAllPosts();
      res.json(result);
    } catch (error) {
      res.status(error.status ?? 500).json({ error: error.message });
    }
  }

  async getPostsByUserId(req: RequestType, res: Response) {
    try {
      const result = await this.postService.getPostsByUserId(req.params.userId);
      res.json(result);
    } catch (error) {
      res.status(error.status ?? 500).json({ error: error.message });
    }
  }

  async getPostById(req: RequestType, res: Response) {
    try {
      const result = await this.postService.getPostById(req.params._id);
      res.json(result);
    } catch (error) {
      res.status(error.status ?? 500).json({ error: error.message });
    }
  }
  async deletePost(req: RequestType, res: Response) {
    try {
      const result = await this.postService.deletePost(req.params._id, req.currentUser._id);
      res.json(result);
    } catch (error) {
      res.status(error.status ?? 500).json({ error: error.message });
    }
  }
  async updatePost(req: RequestType, res: Response) {
    try {
      const result = await this.postService.updatePost(req.body, req.params._id, req.currentUser._id);
      res.json(result);
    } catch (error) {
      res.status(error.status ?? 500).json({ error: error.message });
    }
  }
}
