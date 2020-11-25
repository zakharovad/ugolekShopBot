import {ContextMessageUpdate, Extra, Markup} from 'telegraf';
import Stage from 'telegraf/stage';
import Scene from 'telegraf/scenes/base';
import Product, {IProduct} from "../../models/mongo/product";
import {IProductInvoice} from "../../models/invoiceProduct/IProductInvoice";
import {InvoiceProductIterator} from "../../models/invoiceProduct/InvoiceProductIterator";
import Logger from "../..//util/logger";
import asyncWrapper from "../../util/error-handler";
import {CartCollectionProduct, ICartProduct} from "../../models/cartCollection";
const {leave} = Stage;
const products = new Scene('testproducts');
const menuProducts = (mongoProducts: IProduct[])=>{
    return Extra.HTML().markup((m: Markup) =>
        m.inlineKeyboard(
            mongoProducts.map(item => [
                m.callbackButton(
                    `(${item.title}) ${item.price}`,
                    JSON.stringify({ a: 'product', p: item._id }),
                    false
                )
            ]),
            {}
        )
    );
};
const showProduct = async (ctx: ContextMessageUpdate) =>{
    const action = JSON.parse(ctx.callbackQuery.data);
    const mongoProduct: IProduct = await Product.findOne({_id:action.p});
    console.log("ctx.session.params: ",ctx.session.params);
    let invoiceProduct: IProductInvoice = {
        // reply_to_message_id:ctx.session.params,
        provider_token: process.env.PAYMENT_TOKEN,
        start_parameter:mongoProduct._id,
        title: mongoProduct.get('title'),
        description: mongoProduct.get('description'),
        currency: 'RUB',
        photo_url: mongoProduct.get('previewUrl'),
        is_flexible: true,
        prices: [{label: 'цена', amount: mongoProduct.get('price')*100}],
        payload: 'Test',
        reply_markup: Markup.inlineKeyboard([
            Markup.payButton(ctx.i18n.t('scenes.products.buy')),
            Markup.callbackButton(ctx.i18n.t('scenes.products.to_cart'), 'to_cart')
        ])
    };
    if(ctx.session.params != undefined)
        ctx.deleteMessage(ctx.session.params);
    let res = await ctx.replyWithInvoice(invoiceProduct, {});
    ctx.session.params = res.message_id;
    console.log("ctx.session.params: ",ctx.session.params);
    await ctx.answerCbQuery();
};
products.enter(async (ctx: ContextMessageUpdate) => {
    const mongoProducts: IProduct[] = await Product.find({});
    await ctx.reply('Меню навинок', menuProducts(mongoProducts));


});
products.action(/product/,  showProduct);
export default products;
