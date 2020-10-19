import mongoose, {Connection, ConnectionOptions} from 'mongoose';
import dotenv from 'dotenv';
import {Result, IError, IData} from './models/data';

dotenv.config();
function db(uris: string, options: ConnectionOptions):Promise<Result<Connection>>{
    const data = new Result<Connection>();

    return new Promise((resolve) => {
        if (mongoose.connection.readyState <= 0){
            mongoose.set('useNewUrlParser', true);
            mongoose.set('useFindAndModify', false);
            mongoose.set('useCreateIndex', true);
            mongoose.set('useUnifiedTopology', true);
            mongoose.connect(uris,options
            )
                .catch((err: IError) => {
                    data.errors.push(err);
                    data.status = 'error';
                    resolve(data);

                });
        }else {
            data.status = 'open';
            data.data = mongoose.connection;
            return resolve(data);
        }
        mongoose.connection.on('error', (err: IError) => {

            data.errors.push(err)
            data.status = 'error';
            resolve(data);
        });
        mongoose.connection.once('open', () => {
            data.status = 'open';
            data.data = mongoose.connection;

            resolve(data);
        });
    });
}

export default db;