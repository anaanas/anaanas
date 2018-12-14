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

const createCommon = async (req, res) => {
    if(req.method !== 'POST'){
        console.log('only allow POST method at this endpoint');
        res.status(405).send({ error: 'only allow POST method at this endpoint' });
        return;
    }

    if(req.get('content-type') !== 'application/json'){
        console.log('only allow application/json at this endpoint');
        res.status(400).send({ error: 'only allow application/json at this endpoint' });
        return;
    }

    await connectToDBIfNotAlive().catch(
        (err) => {res.status(500).end(err.message);}
    )
}

exports.create = async (req, res, collectionName) => {
    await createCommon(req, res).catch(
        (err) => {res.status(500).end(err.message);}
    )

    db.collection(collectionName).insertOne(req.body, function(err, r) {
        if(err){
            throw err
        }else{
            const insProdStr = JSON.stringify(req.body)
            console.log(insProdStr +' has been inserted');
            res.send(insProdStr +' has been inserted');
        }
    });
}

exports.createMany = async (req, res, collectionName) => {
    await createCommon(req, res).catch(
        (err) => {res.status(500).end(err.message);}
    )

    db.collection(collectionName).insertMany(req.body, function(err, r) {
        if(err){
            throw err
        }else{
            const insProdStr = JSON.stringify(req.body)
            console.log(insProdStr +' has been inserted');
            res.send(insProdStr +' has been inserted');
        }
    });
}

exports.get = async (req, res, collectionName) => {
    if(req.method!='GET'){
        console.log('only allow GET method at this endpoint');
        res.status(405).send({ error: 'only allow GET method at this endpoint' });
    }

    await connectToDBIfNotAlive().catch(
        (err) => {res.status(500).end(err.message);}
    )

    db.collection(collectionName).find({}).toArray(function(err, docs) {        
        if(err){
            throw err
        } else {
            const docStr = JSON.stringify(docs)
            console.log('docs are ' + docStr);
            res.send('docs are ' + docStr);
        }
    });
}

// TODO: implement update and delete
