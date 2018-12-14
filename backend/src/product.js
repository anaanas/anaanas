'use strict';

const crud = require('./helper/curd');
const auth = require('./auth');

const ROLE_ADMIN = 'admin';

exports.createProductHandler = async (req, res) => {
    if (auth.getRole(req) !== ROLE_ADMIN) {
        // TODO : send redirect to login page.
        res.status(401).send({error: 'method not allowed, login required'});
        return;
    }
    crud.create(req, res, 'products')
}

exports.createProductsHandler = async (req, res) => {
    if (auth.getRole(req) !== ROLE_ADMIN) {
        // TODO : send redirect to login page.
        res.status(401).send({error: 'method not allowed, login required'});
        return;
    }
    crud.createMany(req, res, 'products')
}

exports.getProductsHandler = async (req, res) => {
    crud.get(req, res, 'products')
}
