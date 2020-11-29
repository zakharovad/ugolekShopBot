import mongoose, { Document } from 'mongoose';

export interface IMongoUser extends Document {
    _id: string;
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    created?: Date;
    updated?: Date;
}
export const UserSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        id: Number,
        is_bot: Boolean,
        first_name: String,
        last_name: String,
        username: String,
        language_code: String,
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
    },
    {timestamps: {createdAt: 'created', updatedAt: 'updated'},}
);

const User = mongoose.model<IMongoUser>('User', UserSchema);
export default User;