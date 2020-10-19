import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
    _id: string;
    title: string;
    price: number;
    previewUrl: string;
    description: string;
    created?: Date;
    updated?: Date;
}

export const ProductSchema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        price: Number,
        previewUrl: String,
        description: String,
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
    },
    {timestamps: {createdAt: 'created', updatedAt: 'updated'},}
);

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;