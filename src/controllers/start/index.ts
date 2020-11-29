import { ContextMessageUpdate } from     'telegraf';
import dotenv from 'dotenv';
import Stage from 'telegraf/stage';
import Scene from 'telegraf/scenes/base';
import User, {IMongoUser} from "../../models/mongo/user";
import { getMainKeyboard } from '../../keyboards';
import {findOneAndUpdate} from '../../util/functions';
dotenv.config();
const { leave } = Stage;
const start = new Scene('start');
start.enter(async (ctx: ContextMessageUpdate) => {
    const uid = String(ctx.from.id);
    findOneAndUpdate<IMongoUser>(User, {id:ctx.from.id},ctx.from as IMongoUser);
    const { mainKeyboard } = getMainKeyboard(ctx);
    await ctx.reply(ctx.i18n.t('scenes.start.welcome',{name:ctx.from.first_name}), mainKeyboard);
});
start.command('reset', leave());
// start.leave(async (ctx: ContextMessageUpdate) => {
//     const { mainKeyboard } = getMainKeyboard(ctx);
//
//     await ctx.reply(ctx.i18n.t('scenes.start.by'), mainKeyboard);
// });
export default start;