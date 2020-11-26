import {ContextMessageUpdate, Extra, Markup} from 'telegraf';
import Stage from 'telegraf/stage';
import Scene from 'telegraf/scenes/base';
import {getMainKeyboard, getProductsMenu} from "../../keyboards";
import Product, {IMongoProduct} from "../../models/mongo/product";
import Logger from "../..//util/logger";
import asyncWrapper from "../../util/error-handler";
import {CartCollectionProduct, ICartProduct} from "../../models/cartCollection";
import {showProductCard,backProducts,toCart} from "./actions";
const {leave} = Stage;
const products = new Scene('products');
products.enter(asyncWrapper(async (ctx: ContextMessageUpdate) => {
    const mongoProducts: IMongoProduct[] = await Product.find({});
    const {mainKeyboard} = getMainKeyboard(ctx);
    const productMenu = getProductsMenu(ctx,mongoProducts);

    if (mongoProducts.length > 0) {
        await ctx.reply(ctx.i18n.t('scenes.products.check_assortment'), productMenu);

    } else {
        await ctx.reply(ctx.i18n.t('scenes.products.empty'), mainKeyboard);
    }


}));
products.action(
    /product_card/,
    showProductCard

);
products.action(
    /back_to_products/,
    backProducts

);
products.action(
    /to_cart/,
    toCart

);
export default products;
