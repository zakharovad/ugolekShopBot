import {ContextMessageUpdate, OrderPreCheckoutQuery} from 'telegraf';
import Order, {IMongoOrder} from "../models/mongo/order";
import User, {IMongoUser} from "../models/mongo/user";
import {findOneAndUpdate} from '../util/functions';
import Logger from "../util/logger";
import {CartCollectionProduct} from "../models/cartCollection";
import "../mapping";
import {Document} from "mongoose";

async function asyncMap(object: any): Promise<IMongoOrder>{
    let _resolve: Function;
    automapper.mapAsync('OrderPreCheckoutQuery', 'IMongoOrder', object, (result: any) => {
        _resolve(result);
    })
    return new Promise<IMongoOrder>((resolve) => {
        _resolve = resolve;
    })

}

export const preCheckout = async (ctx: ContextMessageUpdate,next: Function) => {
    if (ctx.updateType == 'pre_checkout_query') {
        // const cart = new CartCollectionProduct(ctx);
        let query: OrderPreCheckoutQuery = ctx.update.pre_checkout_query;
        let order: IMongoOrder = await asyncMap(query);
        findOneAndUpdate<IMongoOrder>(Order, {ext_id: order.ext_id}, order);
        ctx.answerPreCheckoutQuery(true);
    }
};