
import {Markup, ContextMessageUpdate, Extra} from 'telegraf';
import {CartCollectionProduct} from "../models/cartCollection";
import {IMongoProduct} from "../models/mongo/product";

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
};
export const getProductsMenu = (ctx: ContextMessageUpdate,mongoProducts: IMongoProduct[])=>{
    return Extra.HTML().markup((m: Markup) =>
        m.inlineKeyboard(
            mongoProducts.map(item => [
                m.callbackButton(
                    `(${item.title}) ${item.price}${item.currency}`,
                    JSON.stringify({ a: 'product_card', p: item._id }),
                    false
                )
            ]),
            {}
        )
    );

};
export function getProductControl(ctx: ContextMessageUpdate,mongoProduct:IMongoProduct) {
    return Extra.HTML().markup((m: Markup) =>
        m.inlineKeyboard(
            [
                m.callbackButton(
                    ctx.i18n.t('keyboards.product_controls.back'),
                    JSON.stringify({ a: 'back_to_products', p: undefined }),
                    false
                ),
                m.callbackButton(
                    ctx.i18n.t('keyboards.product_controls.to_cart'),
                    JSON.stringify({ a: 'to_cart', p: mongoProduct._id}),
                    false
                )
            ],
            {}
        )
    );
}