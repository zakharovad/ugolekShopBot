import {ContextMessageUpdate} from 'telegraf';
import Logger from "../util/logger";
export class CartCollectionProduct {
    ctx: ContextMessageUpdate;

    constructor(ctx: ContextMessageUpdate) {
        this.ctx = ctx;
    }

    set(product: ICartProduct) {
        product.count = product.count|| 1;
        const index = this.ctx.session.cart.findIndex((cartProduct) => {
            return (cartProduct._id.toString() == product._id.toString() && cartProduct.price == product.price
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
        return this.ctx.session.cart.reduce((sum:number,product:ICartProduct)=>{ return sum+product.price*product.count},0)*100
    }
    getProductsIds():string{
        if(this.ctx.session.cart == undefined){
            return null;
        }
        return this.ctx.session.cart.reduce((ids:string[],product:ICartProduct,index:number)=>{
            ids.push(product._id.toString());
            return ids;
        },[]).join(",");

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
    price: number;
    _id: Object;

}