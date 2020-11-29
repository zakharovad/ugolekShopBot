import {ContextMessageUpdate, Extra, Markup} from 'telegraf';
import Stage from 'telegraf/stage';
import Scene from 'telegraf/scenes/base';
import {CartCollectionProduct, ICartProduct} from "../../models/cartCollection";
import {IProductInvoice} from "../../models/invoiceProduct/IProductInvoice";
import {InvoiceProductIterator} from "../../models/invoiceProduct/InvoiceProductIterator";
const {leave} = Stage;
const cart = new Scene('cart');
cart.enter(async (ctx: ContextMessageUpdate) =>{

    const cartCollection = new CartCollectionProduct(ctx);
    if(cartCollection.getSum() <=0){
        return  ctx.reply(ctx.i18n.t('scenes.cart.empty_text'));
    }
    const invoiceProducts: IProductInvoice[] = [];
    let invoiceProduct: IProductInvoice = {
        provider_token: process.env.PAYMENT_TOKEN,
        start_parameter:'cart',
        title: ctx.i18n.t('scenes.cart.invoice_title'),
        description: cartCollection.getDescription(),
        currency: 'RUB',
        photo_url: "https://s86iva.storage.yandex.net/rdisk/c42871172018b2dc3323f9e4cd09f63bc6fcb041d346b709834ddadd7a33c22f/5fbd9d3a/_OyO2C-69Gx-oZR-GmF_Ozly5hBXo9UWm25QnrCIDsBGzF-Y8SvECPMej0U1RD3-pvQhf-Ar_BHOA5DOpDJNmA==?uid=0&filename=shopping-bag.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&fsize=6546&hid=61475bb0a7c58e7ea0435c16ed7df32c&media_type=image&tknv=v2&etag=78e2a537b2388aca8542ee32b9f37539&rtoken=3VRGabLHBZnW&force_default=no&ycrid=na-8efd3cbf47ffd927f599fc6f4738462b-downloader4e&ts=5b4e308564280&s=56c9fdac356a36dbc768d0cf847a61ca1bea62101878a62483d77f954ef3f27f&pb=U2FsdGVkX19F4trmWMc8CQYMJN7pznOJPNmH1ZbonkkJiPi8zHTT-mOZYG14riWvillSxx77ot0CcV8Euhx67TC9usa-HNckBQ9YKCJbLBc",
        photo_width:256,
        photo_height:256,
        // is_flexible: true,
        need_phone_number: true,
        need_name: true,
        prices: [{label:'стоимость', amount:cartCollection.getSum()}],
        payload: cartCollection.getProductsIds(),
        reply_markup: Markup.inlineKeyboard([
            Markup.payButton(ctx.i18n.t('scenes.products.buy')),
        ])
    };
    invoiceProducts.push(invoiceProduct);
    const iterator = new InvoiceProductIterator(ctx, invoiceProducts);

    for await (const current of iterator){
        if(ctx.session.invoice){
            await ctx.deleteMessage(ctx.session.invoice.message_id)
        }
        ctx.session.invoice = current;

    }

});

export default cart;