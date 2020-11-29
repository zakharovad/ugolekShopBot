
import {IProductInvoice} from "./IProductInvoice";
import {ContextMessageUpdate,} from "telegraf";
import {MessageInvoice} from "telegraf/typings/telegram-types";
export class InvoiceProductIterator implements AsyncIterable<MessageInvoice>{

    products:IProductInvoice[] = [];
    current:number = 0;
    ctx:ContextMessageUpdate;

    constructor(ctx:ContextMessageUpdate,products:IProductInvoice[]) {
     this.products = products;
     this.ctx = ctx;
    }

    [Symbol.asyncIterator](){
        const _this = this;
        return{
            async next():Promise<IteratorResult<MessageInvoice>> {
                const response =  {
                    done: true,
                    value: ({} as MessageInvoice)
                };
                if (_this.current < _this.products.length){
                    const product:IProductInvoice = _this.products[_this.current];
                    _this.current++;
                    response.value = await _this.ctx.replyWithInvoice(product, {});
                    response.done  = false;
                }
                return response;


            }
        }
    }
}