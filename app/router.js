import EmberRouter from '@ember/routing/router';
import config from '@fleetbase/console/config/environment';
import App from './app';

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
  this.route('console', { path: '/' }, function () {
    this.route('account');
    this.mount('@fleetbase/flb-fleetops-extension', {
      as: 'fleet-ops',
      path: 'fleet-ops',
    });
    this.mount('@fleetbase/flb-storefront-extension', {
      as: 'storefront',
      path: 'storefront',
    });
    this.route('extensions');
  });
});
