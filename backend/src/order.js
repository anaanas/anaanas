'use strict';

const crud = require('./helper/curd');
const auth = require('./auth');

const ROLE_ADMIN = 'admin';

exports.createOrderHandler = async (req, res) => {
    // TODO: add validation to ensure the order status is "pending".
    crud.create(req, res, 'orders')
}

exports.getOrdersHandler = async (req, res) => {
    if (auth.getRole(req) !== ROLE_ADMIN) {
        // TODO : send redirect to login page.
        res.status(401).send({error: 'method not allowed, login required'});
        return;
    }
    crud.get(req, res, 'orders')
}
