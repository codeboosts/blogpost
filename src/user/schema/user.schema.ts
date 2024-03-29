import mongoose from 'mongoose';
import { baseSchema } from "../../base/base.schema";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    }
    ,
    ...baseSchema
});


userSchema.pre('findOneAndDelete', async function (next) {
    try {
        const currentCommentId = await this.getQuery()._id;
        
        await this.model.db.model('Comment').deleteMany({ user: currentCommentId });
        await this.model.db.model('Post').deleteMany({ user: currentCommentId });
        
        next();
    } catch (error) {
        throw new Error(error);
    }
});

const User = mongoose.model('User', userSchema);  

export default User;
