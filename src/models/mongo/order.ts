import mongoose, {Document} from 'mongoose';
import {IMongoUser} from "./user";
import {IMongoProduct} from "./product";

export interface IMongoOrder extends Document {
    _id: string;
    ext_id:number
    user: IMongoUser;
    price: number;
    currency: string;
    description?: string;
    created?: Date;
    updated?: Date;
    order_info:Object
    payed:boolean;
    products?:IMongoProduct[]
}

export const OrderSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        ext_id:Number,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        products:[{
            type: mongoose.Schema.Types.ObjectId,
        }],
        price: Number,
        currency: String,
        payed: Boolean,
        description: String,
        order_info: Object,
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
    },
    {timestamps: {createdAt: 'created', updatedAt: 'updated'},}
);
OrderSchema.pre('find', function () {
    this.populate('user');
    this.populate('products');
})
.pre('findOne', function () {
    this.populate('user');
    this.populate('products');
});
const Order = mongoose.model<IMongoOrder>('Order', OrderSchema);
export default Order;