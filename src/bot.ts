import dotenv from 'dotenv';
import path from 'path';
import dataDb from './db';
import { Result } from './models/data';
import { Connection } from 'mongoose';
import asyncWrapper from './util/error-handler';
import Stage from 'telegraf/stage';
import TelegrafI18n, { match } from 'telegraf-i18n';
import Telegraf, { ContextMessageUpdate, Extra, Markup } from 'telegraf';
import startScene from './controllers/start';
import Axios from 'axios';
import Telegram from './telegram';
dotenv.config();
const startBot = async()=>{
    const data  =  await dataDb as Result<Connection>;

    console.log(data.status);

    const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
    const stage = new Stage([
        startScene
    ]);
    const i18n = new TelegrafI18n({
        defaultLanguage: 'ru',
        directory: path.resolve(__dirname, 'locales'),
        useSession: true,
        allowMissing: false,
        sessionName: 'session'
    });

    bot.use(i18n.middleware());
    bot.use(stage.middleware());
    bot.start(asyncWrapper(async (ctx: ContextMessageUpdate) => {
        console.log(ctx);
        ctx.scene.enter('start')}));
    bot.catch((error: any) => {
        console.error( 'Global error has happened, %O', error);
    });
    await Axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/deleteWebhook`);
    bot.startPolling();

};
export {
    startBot
}
