import {ContextMessageUpdate, Extra, Markup} from 'telegraf';
import Product, {IMongoProduct} from "../../models/mongo/product";
import {getMainKeyboard, getProductControl, getProductsMenu} from "../../keyboards";
import {CartCollectionProduct,ICartProduct} from "../../models/cartCollection";
import "../../mapping";
import Logger from "../../util/logger";
import {Message} from "telegraf/typings/telegram-types";
export const showProductCard = async (ctx: ContextMessageUpdate) => {
    const action = JSON.parse(ctx.callbackQuery.data);
    const mongoProduct: IMongoProduct = await Product.findOne({_id:action.p});
    await createCard(ctx,mongoProduct);

};
export const backProducts = async (ctx: ContextMessageUpdate) => {
    const mongoProducts: IMongoProduct[] = await Product.find({});
    const productMenu = getProductsMenu(ctx,mongoProducts);
    await ctx.editMessageText(ctx.i18n.t('scenes.products.check_assortment'), productMenu);
    await ctx.answerCbQuery();
};
export const toCart = async (ctx: ContextMessageUpdate) => {
    const action = JSON.parse(ctx.callbackQuery.data);
    const mongoProduct: IMongoProduct = await Product.findOne({_id: action.p});
    const cartProduct:ICartProduct = automapper.map('IMongoProduct', 'ICartProduct', mongoProduct);
    const cart = new CartCollectionProduct(ctx);
    cart.set(cartProduct);
    const {mainKeyboard} = getMainKeyboard(ctx);
    if(ctx.session.last_notify_to_cart){
        await ctx.deleteMessage(ctx.session.last_notify_to_cart.message_id);
    }
    ctx.session.last_notify_to_cart = await ctx.reply(ctx.i18n.t('scenes.products.to_cart_message'), mainKeyboard);


};
const createCard = async(ctx: ContextMessageUpdate, mongoProduct: IMongoProduct)=>{
    await ctx.editMessageText(`<b>${mongoProduct.title}</b>
<a href="${mongoProduct.previewUrl}"> </a>
<b>Описание:</b> ${mongoProduct.description}
<b>Цена: ${mongoProduct.price} ${mongoProduct.currency}</b>`,
        getProductControl(ctx,mongoProduct)
    );

    await ctx.answerCbQuery();
};