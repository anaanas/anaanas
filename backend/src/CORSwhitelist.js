'use strict';

exports.CORSHandler = async (req, res) => {
    var allowedOrigins = ['http://localhost:3001', 'https://onelinetea.com', 'https://netlify.com'];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.set('Access-Control-Allow-Headers', 'Content-Type, Set-Cookie')
};
