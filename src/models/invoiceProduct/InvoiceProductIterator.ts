
import {IProductInvoice} from "./IProductInvoice";
import {TelegrafContext} from "telegraf/typings/context";

export class InvoiceProductIterator implements AsyncIterable<number>{

    products:IProductInvoice[] = [];
    current:number = 0;
    ctx:TelegrafContext;

    constructor(ctx:TelegrafContext,products:IProductInvoice[]) {
     this.products = products;
     this.ctx = ctx;
    }

    [Symbol.asyncIterator](){
        const _this = this;
        return{
            async next():Promise<IteratorResult<number>> {
                const response =  {
                    done: true,
                    value: _this.current
                };
                if (_this.current < _this.products.length){
                    const product:IProductInvoice = _this.products[_this.current];
                    _this.current++;
                    await _this.ctx.replyWithInvoice(product, {});
                    response.done  = false;
                }
                return response;


            }
        }
    }
}