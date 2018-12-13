'use strict';

const mongodb = require('mongodb')
const f = require('util').format;
const MongoClient = mongodb.MongoClient;
const auth = require('./src/auth');

var client;
var dbConnection;
var db;

const ROLE_ADMIN = 'admin'

// Helper functions.

const connectToDBIfNotAlive = async () =>  {
    if (dbConnection && dbConnection.isConnected()) {
        return;
    }
    const user = encodeURIComponent(process.env.MONGODB_USER);
    const password = encodeURIComponent(process.env.MONGODB_PASS);
    const host = process.env.MONGODB_HOST;
    const authMechanism = 'DEFAULT';

    // Database Name
    const dbName = 'wanglai';

    const uri = f('mongodb://%s:%s@%s:27017/?authMechanism=%s',
      user, password, host, authMechanism);

    console.log("connecting : ", uri)

    try {
        client = new MongoClient(uri)
        dbConnection = await client.connect();
        db = client.db(dbName);
    } catch (e) {
        // TODO: custome error.
        throw e;
    }
}

// Helper functions end.

exports.createProduct = async (req, res) => {
    if (auth.getRole(req) !== ROLE_ADMIN) {
        // TODO : send redirect to login page.
        res.status(401).send({error: 'method not allowed, login required'});
        return;
    }

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

    db.collection('products').insertOne(req.body, function(err, r) {
        if(err){
            throw err
        }else{
            insProdStr = JSON.stringify(req.body)
            console.log(insProdStr +' has been inserted');
            res.send(insProdStr +' has been inserted');
        }
    });
}

exports.getProducts = async (req, res) => {
    if(req.method!='GET'){
        console.log('only allow GET method at this endpoint');
        res.status(405).send({ error: 'only allow GET method at this endpoint' });
    }

    await connectToDBIfNotAlive().catch(
        (err) => {res.status(500).end(err.message);}
    )
    db.collection('products').find({}).toArray(function(err, docs) {        
        if(err){
            throw err
        } else {
            docStr = JSON.stringify(docs)
            console.log('docs are ' + docStr);
            res.send('docs are ' + docStr);
        }
    });
}

// Use this func to test if your local emulator works fine with ENV
// Ref: https://github.com/GoogleCloudPlatform/cloud-functions-emulator/issues/178
exports.getEnv = (req, res) => {
    res.send(JSON.stringify(process.env));
}

exports.getHTTP = async (req, res) => {
    await connectToDBIfNotAlive().catch(
        (err) => {res.status(500).end(err.message);}
    )

    console.log('Hello World: db is ' + dbConnection.isConnected());
    res.send('Hello World: db is ' + dbConnection.isConnected());
}

exports.login = auth.loginHandler;
// Use this for testing auth.
exports.getRole = async(req, res) => {
    res.send({role : auth.getRole(req)});
}
