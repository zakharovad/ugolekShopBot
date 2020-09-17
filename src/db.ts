import mongoose, {Connection} from 'mongoose';
import dotenv from 'dotenv';
import {Result, IError, IData} from './models/data';

dotenv.config();
let resolveF = function (data: IData) {
};

const mongo = new Promise((resolve) => {
    resolveF = resolve;
});
const data = new Result<Connection>();
if (mongoose.connection.readyState <= 0)
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', true);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(
        `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
        {
            user: process.env.DATABASE_USER,
            pass: process.env.DATABASE_PASS,
        }
    )

        .catch((err: IError) => {
            data.errors.push(err);
            data.status = 'error';
            resolveF(data);

        });

mongoose.connection.on('error', (err: IError) => {

    data.errors.push(err)
    data.status = 'error';
    resolveF(data);
});
mongoose.connection.once('open', () => {
    data.status = 'open';
    data.data = mongoose.connection;

    resolveF(data);
});

export default mongo;