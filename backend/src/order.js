'use strict';

const crud = require('./helper/curd');
const auth = require('./auth');
const request = require('request')
const mg = require('mongodb');

const ORDERS_TABLE = 'orders';
const PAYPAL_API = 'https://api.sandbox.paypal.com';

var CLIENT = "Ac4d2prr8x-dQWsoh4vXi4iyZ4CWjsEnUfhpEOkvoZfTvLwAsIKgcJLtIKMKJcg_YbRWps6mGKNNem0Z";
var SECRET = "EO4M6qIqea1LTymRX54pAZgryM62n8aPqM7Xz1GKh_aakTQvwfPXUqbNsZe6U9g9mBkiEvdjIDLqU-kV";
const ORDER_COLLECTION = "orders_v1";

exports.createOrderHandler = async (req, res) => {
  // TODO order validation.
  const orders = req.body;
  try {
    const result = await crud.createMany(orders, PRODUCTS_TABLE);
    res.status(201).send(result.insertedIds);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ err: 'internal error' });
  }
};

exports.getOrdersHandler = async (req, res) => {
  try {
    const orders = await crud.get(req.query.filter, ORDERS_TABLE);
    // TODO: change Access-Control-Allow-Origin to allow our domain before production.
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000').send(orders);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ err: 'internal error' });
  }
};

exports.setupPayment = async (req, res) => {
  
  console.log(req.body)
  const order = JSON.parse(req.body.payload);
  console.log(order.products);

  request.post(PAYPAL_API + '/v1/payments/payment',
  {
    auth: {
      user: CLIENT,
      pass: SECRET,
    },
    body: {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      transactions: [
        {
          amount: {
            total: order.amountToPay,
            currency: 'USD'
        }
      }],
      redirect_urls: {
        return_url: 'https://www.onelinetea.com/',
        cancel_url: 'https://www.onelinetea.com/'
      }
    },
    json: true
  }, 
  async function(err, response) {
    // if payment is not set up in Paypal, return 500.
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    // covert string id to object id. 
    for (var i = 0; i < order.products.length; ++i) {
      order.products[i].productId = new mg.ObjectID(order.products[i].productId);
    }
    // set timestamps
    order.createdAt = new Date();
    order.modifiedAt = new Date();
    // set Paypal txn id 
    order.paypalTxnId = response.body.id;
    console.log(order);
    var result;
    try {
      result = await insertOrder(order);
      console.log(result);
    } catch (err) {
      console.log(err);
      res.status(500).send({ err: 'internal error' });
      throw err;
    }
    
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send({
      paypal_txn_id: response.body.id, 
      order_id: result.insertedId
    });
  });
}

exports.executePayment = async (req, res) => {

  console.log(req.body);
  var paymentID = req.body.paymentID;
  var payerID = req.body.payerID;
  var orderID = req.body.orderID;

  const order = await getOrderById(orderID);
  if (order == undefined) {
    return res.sendStatus(500);
  }
  console.log(order);
    
  request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID + '/execute',
    {
      auth:{
        user: CLIENT,
        pass: SECRET
      },
      body:{
        payer_id: payerID,
        transactions: [
          {
            amount:
            {
              total: order.amountToPay,
              currency: 'USD'
            }
          }
        ]
      },
      json: true
    }, 
    async function(err, response) {
      //console.log(response);
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }

      //TODO : change order status
      try {
        await confirmOrder(orderID);
      } catch (err) {
        console.log(err);
        res.status(500).send({ err: 'internal error' });
        throw err;
      }
      
        // 4. Return a success response to the client
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).send({
        status: 'success'
      });
    }
  );
}

const insertOrder = async (order) => {
  return crud.createOne(order, ORDER_COLLECTION);
}

const getOrderById = async (id) => {
  return crud.get({ "_id" : new mg.ObjectID(id)}, ORDER_COLLECTION);
}

const confirmOrder = async (id) => {
  return crud.updateById(ORDER_COLLECTION, {"_id" :new mg.ObjectID(id)}, {status : 'completed', modifiedAt : new Date()});
}