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

const User = mongoose.model('User', userSchema);

export default User;
