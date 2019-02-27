'use strict';

const auth = require('./src/auth');
const product = require('./src/product');
const order = require('./src/order');
const ROLE_ADMIN = 'admin';

exports.createProducts = async (req, res) => {
    if (auth.getRole(req) !== ROLE_ADMIN) {
        // TODO : send redirect to login page.
        res.status(401).send({error: 'method not allowed, login required'});
        return;
    }
    await product.createProductsHandler(req, res);
}

exports.getProducts = product.getProductsHandler;

exports.getOrders = async (req, res) => {
    // TODO(yang): enable this when login page is ready.
    // if (auth.getRole(req) !== ROLE_ADMIN) {
    //     // TODO : send redirect to login page.
    //     res.status(401).send({error: 'method not allowed, login required'});
    //     return;
    // }
    // await order.getOrdersHandler(req, res);
    order.getOrdersHandler(req, res);
}

exports.createOrder = order.createOrderHandler;

exports.login = auth.loginHandler;

// Use this for testing auth.
exports.getRole = async (req, res) => {
  res.send({ role: auth.getRole(req) });
};

// Use this func to test if your local emulator works fine with ENV
// Ref: https://github.com/GoogleCloudPlatform/cloud-functions-emulator/issues/178
exports.getEnv = (req, res) => {
  res.send(JSON.stringify(process.env));
};

exports.getHTTP = async (req, res) => {
  await connectToDBIfNotAlive().catch(err => {
    res.status(500).end(err.message);
  });

  console.log('Hello World: db is ' + dbConnection.isConnected());
  res.send('Hello World: db is ' + dbConnection.isConnected());
};

exports.setupPayment = order.setupPayment;
exports.executePayment = order.executePayment;