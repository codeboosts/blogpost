import { Schema, model } from 'mongoose';
import { baseSchema } from "../../base/base.schema";

export const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: Buffer,
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ...baseSchema
});

postSchema.pre('findOneAndDelete', async function (next) {
  try {
    const currentPostId = await this.getQuery()._id;

    const commentModel = this.model.db.model('Comment');
    await commentModel.deleteMany({ post: currentPostId });

    next();
  } catch (error) {
    throw new Error(error);
  }
});

const Post = model('Post', postSchema);

export default Post;
