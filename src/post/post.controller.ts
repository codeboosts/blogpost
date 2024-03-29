import { Request, Response } from "express";
import { PostService } from "./post.service";

export class PostController {
    private readonly postService: PostService;

    constructor() {
        this.postService = new PostService();
    }


    async createPost(req: Request, res: Response) {
        try {
            const input = req.body;
            const currentUser = req.currentUser;
            const result = await this.postService.createPost()
        } catch (errorMessage) {
            res.status(500).json({ error: errorMessage.message });
        }
    }

    async getAllPosts(req: Request, res: Response) {
        const result = await this.postService.getAllPosts()

    }

    async getMyPosts(req: Request, res: Response) {
        const result = await this.postService.getMyPosts()

    }

    async getPostById(req: Request, res: Response) {
        const result = await this.postService.getPostById()

    }
    async deletePost(req: Request, res: Response) {
        const result = await this.postService.deletePost()

    }
    async updatePost(req: Request, res: Response) {
        const result = await this.postService.updatePost()

    }
}