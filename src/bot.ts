import dotenv from 'dotenv';
dotenv.config();
import mongo from './db';
 mongo.then(
     (data) => {
         console.log(data)
     }
 );
console.log(process.env.TELEGRAM_TOKEN)