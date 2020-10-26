import {ContextMessageUpdate, Extra, Markup} from 'telegraf';
import Stage from 'telegraf/stage';
import Scene from 'telegraf/scenes/base';
import {getMainKeyboard} from "../../keyboards";
import Product, {IProduct} from "../../models/mongo/product";
import {IProductInvoice} from "../../models/invoiceProduct/IProductInvoice";
import {InvoiceProductIterator} from "../../models/invoiceProduct/InvoiceProductIterator";
import Logger from "../..//util/logger";
const {leave} = Stage;
const products = new Scene('products');
products.enter(async (ctx: ContextMessageUpdate) => {
    const mongoProducts: IProduct[] = await Product.find({});
    const invoiceProducts: IProductInvoice[] = [];
    const {mainKeyboard} = getMainKeyboard(ctx);

    if (mongoProducts.length > 0) {

        for (let i = 0; i < mongoProducts.length; i++) {
            let mongoProduct: IProduct = mongoProducts[i];
            let invoiceProduct: IProductInvoice = {
                provider_token: process.env.PAYMENT_TOKEN,
                start_parameter: 'foo',
                title: mongoProduct.get('title'),
                description: mongoProduct.get('description'),
                currency: 'RUB',
                photo_url: mongoProduct.get('previewUrl'),
                is_flexible: true,
                prices: [{label: mongoProduct.get('title'), amount: mongoProduct.get('price')}],
                payload: 'Test',
                reply_markup: Markup.inlineKeyboard([
                    Markup.payButton(ctx.i18n.t('scenes.products.buy')),
                    Markup.callbackButton(ctx.i18n.t('scenes.products.to_cart'), 'to_cart-'+mongoProduct._id)
                ])
            };
            invoiceProducts.push(invoiceProduct);
        }
        const iterator = new InvoiceProductIterator(ctx, invoiceProducts);

        for await (const current of iterator){
            console.log(current)
        }


    } else {
        await ctx.reply(ctx.i18n.t('scenes.start.welcome'), mainKeyboard);
    }


});

export default products;
