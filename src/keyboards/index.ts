
import { Markup, ContextMessageUpdate } from 'telegraf';
import {CartCollectionProduct} from "../models/cartCollection";

export const getMainKeyboard = (ctx: ContextMessageUpdate) =>{
    const cart = new CartCollectionProduct(ctx);
    const mainKeyboardProducts = ctx.i18n.t('keyboards.main_keyboard.products');
    const mainKeyboardCart = ctx.i18n.t('keyboards.main_keyboard.cart',{
        count:cart.getCollection().length
    });
    let mainKeyboard: any = Markup.keyboard([
        [mainKeyboardProducts, mainKeyboardCart]
    ]);
    mainKeyboard = mainKeyboard.resize().extra();
    return {
        mainKeyboard
    }
}