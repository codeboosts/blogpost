import mongoose from 'mongoose';
import { baseSchema } from "../../base/base.schema";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: Buffer,
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ...baseSchema
});

// postSchema.pre('findOneAndDelete', async function (next) {
//   try {
//     const currentPostId = await this.getQuery()._id;

//     const commentModel = this.model.db.model('Comment');
//     await commentModel.deleteMany({ post: currentPostId });

//     next();
//   } catch (error) {
//     throw new Error(error);
//   }
// });

const Post = mongoose.model('Post', postSchema);

export default Post;
