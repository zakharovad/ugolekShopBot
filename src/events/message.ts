import {ContextMessageUpdate, OrderPreCheckoutQuery} from 'telegraf';
import Order, {IMongoOrder} from "../models/mongo/order";
import User, {IMongoUser} from "../models/mongo/user";
import {findOneAndUpdate} from '../util/functions';
import Logger from "../util/logger";
import {CartCollectionProduct} from "../models/cartCollection";
import "../mapping";
import {Document} from "mongoose";
import {getMainKeyboard} from "../keyboards";

export const message = async (ctx: ContextMessageUpdate, next: Function) => {

    if (ctx.updateSubTypes.includes('successful_payment')){
        new CartCollectionProduct(ctx).clear();
        const {mainKeyboard} = getMainKeyboard(ctx);
        ctx.reply(ctx.i18n.t('order.successful_pay'), mainKeyboard);
    }

};