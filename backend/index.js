'use strict';

const auth = require('./src/auth');
const product = require('./src/product');
const order = require('./src/order');

exports.createProduct = product.createProductHandler;

exports.createProducts = product.createProductsHandler;

exports.getProducts = product.getProductsHandler;

exports.createOrder = order.createOrderHandler;

exports.getOrders = order.getOrdersHandler;

exports.login = auth.loginHandler;

// Use this for testing auth.
exports.getRole = async(req, res) => {
    res.send({role : auth.getRole(req)});
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
