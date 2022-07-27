import { writeFileSync, readFileSync } from 'fs'
import db from './db';
import dotenv from 'dotenv';
import Logger from "./util/logger";
import {findOneAndUpdate} from './util/functions';
import Product, {IMongoProduct} from "./models/mongo/product";
dotenv.config();
async function start(){
    const rawdata:Buffer = readFileSync('products.json');
    let products:any[] = JSON.parse(rawdata.toString());
    if(!Array.isArray(products) || products.length <= 0 ){
        return Promise.resolve();
    }
    Logger.info('Before start wake connection to  mongo');
    const connect = await db(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
        {
            user: process.env.DATABASE_USER,
            pass: process.env.DATABASE_PASS,
        })
    Logger.info(`After connection to  mongo, status:${connect.status}`);
    for(const product of products){
        await findOneAndUpdate<IMongoProduct>(Product, {title:product.title},product as IMongoProduct);
        Logger.info(`After findOneAndUpdate product title:${product.title}`);
    }
}
start()