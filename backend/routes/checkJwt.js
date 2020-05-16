const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const config = require('config');

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${config.auth0.Auth0Domain}/.well-known/jwks.json`
    }),

    audience: `${config.auth0.Auth0Client}`,
    issuer: `https://${config.auth0.Auth0Domain}/`,
    algorithms: ['RS256']
});

module.exports = checkJwt;