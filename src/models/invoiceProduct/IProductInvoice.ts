import {NewInvoiceParameters, InlineKeyboardMarkup} from "telegraf/typings/telegram-types";
import {Markup} from "telegraf";

export interface IProductInvoice extends NewInvoiceParameters{
    reply_markup:Markup & InlineKeyboardMarkup
}