import { I18n } from 'telegraf-i18n';
import { TelegrafContext } from 'telegraf/typings/context'
import  { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import {ICartProduct} from "../models/cartCollection";
declare module 'telegraf'  {


    interface ContextMessageUpdate extends TelegrafContext, SceneContextMessageUpdate{
        i18n: I18n;
        session: {
            cart:ICartProduct[],
            params?:any
        };

    }
}