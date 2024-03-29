import { CreateCommentInputDto, UpdateCommentInputDto } from './dto/CommentInput.dto';
import Comment from './schema/comment.schema';
import { Types } from 'mongoose';
import { IdOutput, SuccessOutput } from '../common/dto/CommonOutput.dto';
import { NotFoundException } from '../error/exceptions';

export class CommentService {
  async createComment(input: CreateCommentInputDto, userId: string): Promise<IdOutput> {
    if (input.CommentId) {
      await this.getCommentById(input.CommentId);
    }

    const comment = new Comment()
    comment.text = input.Text
    comment.user = new Types.ObjectId(userId)
    comment.post = new Types.ObjectId(input.PostId)
    comment.parentComment = new Types.ObjectId(input.CommentId)

    const createdComment = await Comment.create(comment);

    return { _id: createdComment._id.toString() };
  }

  async getCommentsByPostId(postId: string) {
    return Comment.find({ post: new Types.ObjectId(postId) as any });
  }

  async getCommentById(_id: string) {
    const comment = await Comment.findById({ _id });
    if (!comment) {
      throw new NotFoundException('Invalid comment specified');
    }

    return comment;
  }

  async getReplies(_id: string) {
    return Comment.find({ parentComment: _id });
  }

  async deleteComment(commentId: string, userId: string): Promise<SuccessOutput> {
    const deletedComment = await Comment.findOneAndDelete({ _id: commentId, user: userId });

    if (!deletedComment) {
      throw new NotFoundException('Invalid comment specified');
    }

    return { isSuccess: true };
  }

  async updateComment(input: UpdateCommentInputDto, commentId: string, userId: string): Promise<SuccessOutput> {
    const updatedComment = await Comment.findOneAndUpdate({ _id: commentId, user: userId }, { text: input.Text });
    if (!updatedComment) {
      throw new NotFoundException('Invalid comment specified');
    }

    return { isSuccess: true };
  }
}
