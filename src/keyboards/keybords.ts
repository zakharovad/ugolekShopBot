
import { Markup, ContextMessageUpdate } from 'telegraf';

export const getMainKeyboard = (ctx: ContextMessageUpdate) =>{
    const mainKeyboardProducts = ctx.i18n.t('keyboards.main_keyboard.products');
    const mainKeyboardCart = ctx.i18n.t('keyboards.main_keyboard.cart');
    let mainKeyboard: any = Markup.keyboard([
        [mainKeyboardProducts, mainKeyboardCart]
    ]);
    mainKeyboard = mainKeyboard.resize().extra();
    return {
        mainKeyboard
    }
}