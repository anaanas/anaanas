'use strict';

const crud = require('./helper/curd');
const auth = require('./auth');

const PRODUCTS_TABLE = 'products';

exports.createProductsHandler = async (req, res) => {
  // TODO : have these as configs, ex. allowedMethods = ['POST', 'GET'].
  // use a helper to generate errors.
  if (req.method !== 'POST') {
    console.log('only allow POST method at this endpoint');
    res.status(405).send({ error: 'only allow POST method at this endpoint' });
    return;
  }

  if (req.get('content-type') !== 'application/json') {
    console.log('only allow application/json at this endpoint');
    res
      .status(400)
      .send({ error: 'only allow application/json at this endpoint' });
    return;
  }

  const products = req.body;
  try {
    const result = await crud.createMany(products, PRODUCTS_TABLE);
    res.status(201).send(result.insertedIds);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ err: 'internal error' });
  }
};

exports.getProductsHandler = async (req, res) => {
  if (req.method != 'GET') {
    console.log('only allow GET method at this endpoint');
    res.status(405).send({ error: 'only allow GET method at this endpoint' });
  }

  var filter = req.body;
  try {
    const products = await crud.get(filter, PRODUCTS_TABLE);
    res.send(products);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ err: 'internal error' });
  }
};
