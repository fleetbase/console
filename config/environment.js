'use strict';

module.exports = function (environment) {
    let ENV = {
        modulePrefix: '@fleetbase/console',
        environment,
        rootURL: '/',
        locationType: 'history',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
            },
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        },

        API: {
            host: getenv('API_HOST', 'http://localhost:8000'),
            namespace: getenv('API_NAMESPACE', 'int/v1'),
        },

        osrm: {
            host: getenv('OSRM_HOST', 'https://routing.fleetbase.io'),
            servers: getenv('OSRM_SERVERS', '').split(',').filter(Boolean),
        },

        socket: {
            path: getenv('SOCKETCLUSTER_PATH', '/socketcluster/'),
            hostname: getenv('SOCKETCLUSTER_HOST', 'localhost'),
            secure: getenv('SOCKETCLUSTER_SECURE', false),
            port: getenv('SOCKETCLUSTER_PORT', 38000),
        },

        'ember-simple-auth': {
            routeAfterAuthentication: 'console',
        },

        'ember-local-storage': {
            namespace: '@fleetbase',
            keyDelimiter: '/',
            includeEmberDataSupport: true,
        },
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
        ENV.APP.autoboot = false;
    }

    if (environment === 'production') {
        // here you can enable a production-specific feature
    }

    return ENV;
};

function getenv(variable, defaultValue = null) {
    return process.env[variable] !== undefined ? process.env[variable] : defaultValue;
}
