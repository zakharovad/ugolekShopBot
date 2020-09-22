import { ContextMessageUpdate } from 'telegraf';
const asyncWrapper = (fn: Function) => {
    return async function(ctx: ContextMessageUpdate, next: Function) {
        try {
            return await fn(ctx);
        } catch (error) {
            console.log(error)
            await ctx.reply(ctx.i18n.t('shared.something_went_wrong'));
            return next();
        }
    };
};

export default asyncWrapper;