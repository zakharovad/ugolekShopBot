import 'automapper-ts'
import IMemberConfigurationOptions = AutoMapperJs.IMemberConfigurationOptions;
import {findOneAndUpdate,findOne} from '../util/functions';
import User,{IMongoUser} from "../models/mongo/user";
import IMemberCallback = AutoMapperJs.IMemberCallback;
import Product from "../models/mongo/product";

automapper.createMap('IMongoProduct', 'IProduct').forAllMembers((destinationObject: any, destinationPropertyName: string, value: any) => {
    destinationObject[destinationPropertyName] = value;

})
automapper.createMap('IMongoProduct', 'ICartProduct')
    .forMember('title', (opts: IMemberConfigurationOptions) => {
        opts.mapFrom('title')
    })
    .forMember('description', (opts: IMemberConfigurationOptions) => {
        opts.mapFrom('description')
    })
    .forMember('_id', (opts: IMemberConfigurationOptions) => {
        opts.mapFrom('_id')
    })
    .forMember('count', (opts: IMemberConfigurationOptions) => {
        return 1
    })
    .forMember('price', (opts: IMemberConfigurationOptions) => {
        opts.mapFrom('price')
    });

automapper.createMap('OrderPreCheckoutQuery', 'IMongoOrder')
    .forMember('ext_id', (opts: IMemberConfigurationOptions) => {
        opts.mapFrom('id')
    })
    .forMember('description', (opts: IMemberConfigurationOptions) => {
        opts.mapFrom('invoice_payload')
    })
    .forMember('currency', (opts: IMemberConfigurationOptions) => {
        opts.mapFrom('currency')
    })
    .forMember('order_info', (opts: IMemberConfigurationOptions) => {
        opts.mapFrom('order_info')
    })
    .forMember('user', async (opts: IMemberConfigurationOptions, cb: IMemberCallback) => {
        let queryUser =opts.sourceObject['from'];
        let user = await findOne<IMongoUser>(User, {id:queryUser.id})
        return cb(user._id);
    })
    .forMember('products',  (opts: IMemberConfigurationOptions) => {
        let stringKeys =opts.sourceObject['invoice_payload'];
        return stringKeys.split(',');
    })
    .forMember('price',  (opts: IMemberConfigurationOptions) => {
        return parseInt(opts.sourceObject['total_amount'],10)/100;
    })
    .forMember('payed',  (opts: IMemberConfigurationOptions) => {
        return false;
    });

