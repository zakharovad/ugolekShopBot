import { ContextMessageUpdate } from 'telegraf';
import Logger from "../util/logger";
export const forTesting = async (ctx: ContextMessageUpdate, next: Function) => {

    if(ctx.message == undefined ||
        ctx.message.text == undefined||
        ctx.message.text.search(/^\/test/) == -1
    )
        return next();
    if(ctx.from.id === +process.env.ADMIN_ID){
        return next();
    }

    return ctx.reply('Sorry, you are not an admin :(');
};