import { ContextMessageUpdate ,Extra,Markup } from     'telegraf';
import Stage from 'telegraf/stage';
import Scene from 'telegraf/scenes/base';
import { NewInvoiceParameters ,ExtraInvoice,InlineKeyboardMarkup,InlineKeyboardButton} from 'telegraf/typings/telegram-types'
import {getMainKeyboard} from "../../keyboards";
import Product,{IProduct} from "../../models/mongo/product";

const { leave } = Stage;
const products = new Scene('products');
products.enter(async (ctx: ContextMessageUpdate) => {
    const products: IProduct[] = await Product.find({});
    const { mainKeyboard } = getMainKeyboard(ctx);
    if(products.length > 0){
        let product:IProduct = products[0];
        let invoiceProduct:NewInvoiceParameters = {
            provider_token: process.env.PAYMENT_TOKEN,
            start_parameter: 'foo',
            title: product.get('title'),
            description: product.get('description'),
            currency: 'RUB',
            photo_url:  product.get('previewUrl'),
            is_flexible: true,
            prices: [{ label: product.get('title'), amount: product.get('price') }],
            payload: 'Test'
        }

        const inlineMessageRatingKeyboard = [[
            { text: "Test", callback_data: "like" },
        ]];
        await ctx.replyWithInvoice(invoiceProduct,/* {
            reply_markup: {inline_keyboard:inlineMessageRatingKeyboard as InlineKeyboardButton[][]} as InlineKeyboardMarkup
        } as ExtraInvoice*/)
    }else{
        await ctx.reply(ctx.i18n.t('scenes.start.welcome'), mainKeyboard);
    }


});
export default products;
export interface ITelegramProduct {
    
}