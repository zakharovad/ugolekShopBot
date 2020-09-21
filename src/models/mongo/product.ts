import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
    _id: string;
    title: string;
    price: number;
    previewUrl: string;
    description: string;
}

export const ProductSchema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        price: Number,
        previewUrl: String,
        description: String,
    },
    { _id: false }
);

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;