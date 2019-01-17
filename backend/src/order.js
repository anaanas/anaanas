'use strict';

const crud = require('./helper/curd');
const auth = require('./auth');

const ORDERS_TABLE = 'orders';

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
