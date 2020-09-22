import { ContextMessageUpdate } from     'telegraf';
import Stage from 'telegraf/stage';
import Scene from 'telegraf/scenes/base';
import { getMainKeyboard } from '../../keyboards'
const { leave } = Stage;
const start = new Scene('start');
start.enter(async (ctx: ContextMessageUpdate) => {
    const uid = String(ctx.from.id);
    const { mainKeyboard } = getMainKeyboard(ctx);
    await ctx.reply(ctx.i18n.t('scenes.start.welcome_back'), mainKeyboard);
});
start.command('cancel', leave());
start.leave(async (ctx: ContextMessageUpdate) => {
    const { mainKeyboard } = getMainKeyboard(ctx);

    await ctx.reply(ctx.i18n.t('scenes.start.by'), mainKeyboard);
});
export default start;