'use strict';
const cookieHelper = require('./helper/cookieHelper');
const jwtHelper = require('./helper/jwtHelper');
const USER_INFO = 'userInfo';

// login Handler, if authentication succeeds, save the jwt token in cookie.
exports.loginHandler = async (req, res) => {
  const user = req.body.user;
  const password = req.body.pass;

  if (user !== 'admin' || password !== 'admin') {
    res.cookie(USER_INFO, undefined);
    // TODO: change Access-Control-Allow-Origin to allow our domain before production.
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000').set('Access-Control-Allow-Headers', 'Content-Type').send('failed to login');
    return;
  }

  // TODO: change Access-Control-Allow-Origin to allow our domain before production.
  res.cookie(USER_INFO, jwtHelper.getToken({ user: user, role: 'admin' }));
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000').set('Access-Control-Allow-Headers', 'Content-Type').send('login succeeded');
};

// Return role of the user. Will return undefined if token not valid or expired.
exports.getRole = req => {
  var role = '';
  try {
    cookieHelper.parseCookies(req);
    console.log(req.cookies);
    // Will throw if token corrupted.
    const claim = jwtHelper.getClaim(req.cookies[USER_INFO]);
    role = claim.role;
  } catch (err) {
    console.log(err.message);
    return undefined;
  }

  return role;
};
