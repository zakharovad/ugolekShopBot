import dotenv from 'dotenv';
import dataDb from './db';
import {Result} from "./models/data";
import {Connection} from "mongoose";
dotenv.config();
const startBot  = async function (){
    let data  =  await dataDb as Result<Connection>;
    console.log(data.status)

}
export {
    startBot
}
