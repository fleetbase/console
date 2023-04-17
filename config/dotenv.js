/* eslint-env node */

'use strict';

module.exports = function (env) {
    return {
        clientAllowedKeys: ['GOOGLE_API_KEY', 'STRIPE_KEY', 'API_HOST'],
        fastbootAllowedKeys: [],
        failOnMissingKey: false,
        path: `./environments/.env.${env}`,
    };
};
