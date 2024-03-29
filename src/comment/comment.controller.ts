import { CommentService } from "./comment.service";
import { Response } from "express";

export class CommentController {
  private commentService: CommentService;

  constructor() {
    this.commentService = new CommentService();
  }

  createComment = async (req: RequestType, res: Response) => {
    try {
      const result = await this.commentService.createComment(req.body, req.currentUser._id);
      res.json(result);
    } catch (error) {
      res.status(error.status ?? 500).json({ error: error.message });
    }
  };

  getCommentsByPostId = async (req: RequestType, res: Response) => {
    try {
      const result = await this.commentService.getCommentsByPostId(req.params.postId);
      res.json(result);
    } catch (error) {
      res.status(error.status ?? 500).json({ error: error.message });
    }
  };

  getReplies = async (req: RequestType, res: Response) => {
    try {
      const result = await this.commentService.getReplies(req.params._id);
      res.json(result);
    } catch (error) {
      res.status(error.status ?? 500).json({ error: error.message });
    }
  };

  deleteComment = async (req: RequestType, res: Response) => {
    try {
      const result = await this.commentService.deleteComment(req.params._id, req.currentUser._id);
      res.json(result);
    } catch (error) {
      res.status(error.status ?? 500).json({ error: error.message });
    }
  };

  updateComment = async (req: RequestType, res: Response) => {
    try {
      const result = await this.commentService.updateComment(req.body, req.params._id, req.currentUser._id);
      res.json(result);
    } catch (error) {
      res.status(error.status ?? 500).json({ error: error.message });
    }
  };
}
