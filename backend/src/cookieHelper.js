const cookieParser = require('cookie-parser');
const cookie = require('cookie')

exports.parseCookies = (req) => {
    req.cookies = cookie.parse(req.headers.cookie, undefined)
    req.cookies = cookieParser.JSONCookies(req.cookies)
}