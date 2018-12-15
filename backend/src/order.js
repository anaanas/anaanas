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
    } catch(err) {
        console.log(err.message);
        res.status(500).send({ err: 'internal error'});
    }
}

exports.getOrdersHandler = async (req, res) => {
    var filter = req.body;
    try {
        const orders = await crud.get(filter, ORDERS_TABLE)
        res.send(orders);
    } catch(err) {
        console.log(err.message);
        res.status(500).send({ err: 'internal error'});
    }}
