'use strict';
const jwt = require('jsonwebtoken');

const secret = 'shhhh'

// Generate jwt token for the claim, set expiration time to 1h.
exports.getToken = (claim) => {
  return jwt.sign(claim, secret, { expiresIn: 60 * 60 })
}

// This function calls verify if the token has been tampered with.
// Once verified, the claim will be returned.
exports.getClaim = (token) => {
  try {
    var claim = jwt.verify(token, secret);
    return claim;
  } catch(err) {
    throw err;
  }
}