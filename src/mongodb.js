import mongoose from 'mongoose';
import fs from 'fs';

const secret = JSON.parse(fs.readFileSync('secret.json', 'utf-8'));
const MONGO_URL = `mongodb://${secret.user}:${secret.password}@ds257551.mlab.com:57551/carly`;

let db = null;

// connect to db

const connect = () => new Promise((resolve, reject) => {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true }, (err) => {
        if (err) throw new Error(`Error connecting to MongoDB: \n${err}`);

        db = mongoose.connection;
        db.Promise = global.Promise;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => console.log(' Connected to mongoose'));
        
        if (db.readyState === 1) resolve();
        else reject();
    });
});

// get current mongoose db connection
const get = () => {
    if(!db) {
        throw new Error('Not connected to mongodb. Call connect first!');
    }

    return { db: db };
}

// init db connection
const init = () => {
    connect()
        .then(() => {
            console.log('   db connected successfully');
        });
}

export { get, init };