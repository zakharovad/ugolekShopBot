import {ContextMessageUpdate} from 'telegraf';

export class CartCollectionProduct {
    ctx: ContextMessageUpdate;

    constructor(ctx: ContextMessageUpdate) {
        this.ctx = ctx;
    }

    set(product: ICartProduct) {
        product.count = product.count|| 1;
        const index = this.ctx.session.cart.findIndex((cartProduct) => {
            return (cartProduct.start_parameter == product.start_parameter && cartProduct.total_amount == product.total_amount
            );
        })
        if (index >= 0) {
            this.ctx.session.cart[index].count += product.count
        }else{
            this.ctx.session.cart.push(product)
        }
    }
    clear(){
        this.ctx.session.cart = [];
    }
    getSum():number{
        if(this.ctx.session.cart == undefined){
            return 0.00;
        }
        return this.ctx.session.cart.reduce((sum:number,product:ICartProduct)=>{ return sum+product.total_amount*product.count*100},0)
    }
    getDescription():string{
        if(this.ctx.session.cart == undefined){
            return "";
        }
        return this.ctx.session.cart.reduce((titles:string[],product:ICartProduct,index:number)=>{
            titles.push(`${index+1}) ${product.title} - ${product.count} шт.`);
            return titles;
            },[]).join("\n");
    }
    getCollection(){
        if(this.ctx.session.cart == undefined)
            this.ctx.session.cart = [];
        return this.ctx.session.cart
    };
}

export type ICartProduct = {
    count?: number;
    title: string;
    description?: string;
    total_amount: number;
    start_parameter: string;

}