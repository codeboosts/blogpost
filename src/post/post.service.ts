import { IdOutput, SuccessOutput } from "../common/dto/CommonOutput.dto";
import { CreatePostInputDto, UpdatePostInputDto } from "./dto/PostInput.dto";
import Post from "./schema/post.schema";
import { NotFoundException } from "../error/exceptions";
import { Types } from "mongoose";

export class PostService {
  async createPost(input: CreatePostInputDto, userId: string): Promise<IdOutput> {
    const post = new Post();
    post.title = input.Title;
    post.content = input.Content;
    post.user = new Types.ObjectId(userId);

    const createdPost = await Post.create(post);

    return { _id: createdPost._id.toString() };
  }

  async getPostsByUserId(userId: string) {
    return Post.find({ user: userId });
  }

  async getAllPosts() {
    const posts = await Post.find();

    return posts;
  }

  async getPostById(_id: string) {
    const post = await Post.findOne({ _id });
    if (!post) {
      throw new NotFoundException("Invalid post specified");
    }

    return post;
  }

  async deletePost(postId: string, userId: string): Promise<SuccessOutput> {
    const deletedPost = await Post.findOneAndDelete({ _id: postId, user: userId });

    if (!deletedPost) {
      throw new NotFoundException("Invalid post specified");
    }

    return { isSuccess: true };
  }

  async updatePost(input: UpdatePostInputDto, postId: string, userId: string): Promise<SuccessOutput> {
    const updatedPost = await Post.findOneAndUpdate({ _id: postId, user: userId }, { title: input.Title, content: input.Content });

    if (!updatedPost) {
      throw new NotFoundException("Invalid post specified");
    }

    return { isSuccess: true };
  }
}
