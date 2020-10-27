import dotenv from 'dotenv';
import path from 'path';
import db from './db';
import { Result } from './models/data';
import { Connection } from 'mongoose';
import asyncWrapper from './util/error-handler';
import  Stage from 'telegraf/stage';
import session from 'telegraf/session';
import TelegrafI18n, { match } from 'telegraf-i18n';
import Telegraf, { ContextMessageUpdate, Extra, Markup } from 'telegraf';
import startScene from './controllers/start';
import productsScene from './controllers/products';
import Logger from "./util/logger";
import Axios from 'axios';
import Telegram from './telegram';
dotenv.config();
async function wakeMongoConnection() {
    Logger.info('Start Wake Connection to  mongo');
    await db(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
        {
            user: process.env.DATABASE_USER,
            pass: process.env.DATABASE_PASS,
        })
}
const startBot = async()=>{
    await wakeMongoConnection();



    const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
    const stage = new Stage([
        startScene,
        productsScene
    ]);
    const i18n = new TelegrafI18n({
        defaultLanguage: 'ru',
        directory: path.resolve(__dirname, 'locales'),
        useSession: true,
        allowMissing: false,
        sessionName: 'session'
    });
    bot.use(session());
    bot.use(i18n.middleware());
    bot.use(stage.middleware());
    bot.start(asyncWrapper(async (ctx: ContextMessageUpdate) => {ctx.scene.enter('start')}));

    bot.catch((error: any) => {
        console.error( 'Global error has happened, %O', error);
    });

    bot.hears(
        match('keyboards.main_keyboard.products'),
        asyncWrapper(async (ctx: ContextMessageUpdate) => await ctx.scene.enter('products'))
    );
    await Axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/deleteWebhook`);
    bot.startPolling();

};
export {
    startBot
}
