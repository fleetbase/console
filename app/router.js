import EmberRouter from '@ember/routing/router';
import config from '@fleetbase/console/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('auth', function () {
    this.route('login', { path: '/' });
  });
  this.route('console', { path: '/' });
});
