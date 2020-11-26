import mongoose, { Document } from 'mongoose';

export interface IMongoProduct extends Document {
    _id: string;
    title: string;
    price: number;
    currency: string;
    previewUrl: string;
    description: string;
    created?: Date;
    updated?: Date;
}

export const ProductSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        title: String,
        price: Number,
        currency: String,
        previewUrl: String,
        description: String,
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
    },
    {timestamps: {createdAt: 'created', updatedAt: 'updated'},}
);

const Product = mongoose.model<IMongoProduct>('Product', ProductSchema);
export default Product;