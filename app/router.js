import EmberRouter from '@ember/routing/router';
import config from '@fleetbase/console/config/environment';

export default class Router extends EmberRouter {
    location = config.locationType;
    rootURL = config.rootURL;
}

Router.map(function () {
    this.route('auth', function () {
        this.route('login', { path: '/' });
        this.route('forgot-password');
        this.route('reset-password');
    });
    this.route('onboard', function () {
        this.route('verify-email');
    });
    this.route('console', { path: '/' }, function () {
        this.route('home', { path: '/' });
        this.route('extensions');
        this.route('account', function () {});
        this.route('settings', function () {});
        this.mount('@fleetbase/fleetops-engine', {
            as: 'fleet-ops',
            path: 'fleet-ops',
        });
        this.mount('@fleetbase/storefront-engine', {
            as: 'storefront',
            path: 'storefront',
        });
        this.mount('@fleetbase/dev-engine', {
            as: 'developers',
            path: 'developers',
        });
        this.route('admin', function () {
            this.route('config', function () {
                this.route('database');
                this.route('cache');
                this.route('filesystem');
                this.route('mail');
                this.route('notification-channels');
                this.route('queue');
                this.route('services');
            });
        });
    });
    this.route('install');
});
