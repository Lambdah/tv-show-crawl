const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const config = require('config');

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${config.Auth0Domain}/.well-known/jwks.json`
    }),

    audience: config.Auth0Client,
    issuer: `https://${config.Auth0Domain}/`,
    algorithms: ['RS256']
});

module.exports = checkJwt;