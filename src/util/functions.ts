import mongoose, {Document} from "mongoose";
import {IError} from '../models/data';
export async function findOne<K extends Document>(schema: mongoose.Model<K>, filter: any): Promise<K> {
    let _resolve: Function;
    schema.findOne(filter).exec((err: IError, docs: K) => {
        !!err ? _resolve(null) : _resolve(docs)
    });
    return new Promise<K>((resolve) => {
        _resolve = resolve;
    })
}
export async function findOneAndUpdate<K extends Document>(schema: mongoose.Model<K>, filter: any,data:K): Promise<K> {
    let _resolve: Function;
    schema.findOneAndUpdate(filter,data, {upsert: true, new: true}).exec((err: IError, docs: K) => {
        !!err ? _resolve(null) : _resolve(docs)
    });
    return new Promise<K>((resolve) => {
        _resolve = resolve;
    })
}