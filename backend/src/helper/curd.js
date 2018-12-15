'use strict';

const mongodb = require('mongodb')
const f = require('util').format;
const MongoClient = mongodb.MongoClient;
// Database name in mongodb
const dbName = 'wanglai';

var dbConnection;
var db;

const connectToDBIfNotAlive = async () =>  {
    if (dbConnection && dbConnection.isConnected()) {
        return;
    }
    const user = encodeURIComponent(process.env.MONGODB_USER);
    const password = encodeURIComponent(process.env.MONGODB_PASS);
    const host = process.env.MONGODB_HOST;
    const authMechanism = 'DEFAULT';

    const uri = f('mongodb://%s:%s@%s:27017/?authMechanism=%s',
      user, password, host, authMechanism);

    console.log('connecting : ', host, '27017')

    try {
        dbConnection = await MongoClient.connect(uri, { useNewUrlParser: true });
        db = dbConnection.db(dbName);
    } catch (e) {
        // TODO: custome error.
        throw e;
    }
}

exports.createMany = async (docs, collectionName) => {
    await connectToDBIfNotAlive();
    return db.collection(collectionName).insertMany(docs);
}

exports.get = async (filter, collectionName) => {
    await connectToDBIfNotAlive()
    if (filter === undefined) {
        filter = {};
    }
    return db.collection(collectionName).find(filter).toArray();
}

// TODO: implement update and delete
