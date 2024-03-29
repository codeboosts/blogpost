import { CommentService } from "./comment.service";
import { Response } from "express";

export class CommentController {
  private readonly commentService: CommentService;

  constructor() {
    this.commentService = new CommentService();
  }


  createComment = async (req: RequestType, res: Response) => {
    try {
      return this.commentService.createComment(req.body, req.currentUser._id);
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  
  getCommentsByPostId = async (req: RequestType, res: Response) => {
    try {
      return this.commentService.getCommentsByPostId(req.params.postId);
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  
  getReplies = async (req: RequestType, res: Response) => {
    try {
      return this.commentService.getReplies(req.params._id);
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  
  deleteComment = async (req: RequestType, res: Response) => {
    try {
      return this.commentService.deleteComment(req.params._id, req.currentUser._id);
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }

  
  updateComment = async (req: RequestType, res: Response) => {
    try {
      return this.commentService.updateComment(req.body, req.params._id, req.currentUser._id);
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }
}
