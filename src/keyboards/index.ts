
import { Markup, ContextMessageUpdate } from 'telegraf';
import {CartCollectionProduct} from "../models/cartCollection";

export const getMainKeyboard = (ctx: ContextMessageUpdate) =>{
    const controls1 = [];
    const controls2 = [];
    const cart = new CartCollectionProduct(ctx);
    controls1.push(ctx.i18n.t('keyboards.main_keyboard.products'));
    controls1.push(ctx.i18n.t('keyboards.main_keyboard.cart',{
        count:cart.getCollection().length
    }));

    if(cart.getCollection().length > 0){
        controls2.push(ctx.i18n.t('keyboards.main_keyboard.remove_cart','remove_cart'));
    }
    let mainKeyboard: any = Markup.keyboard([
        controls1,controls2
    ]);
    mainKeyboard = mainKeyboard.resize().extra();
    return {
        mainKeyboard
    }
}