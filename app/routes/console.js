import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ConsoleRoute extends Route {
  @service session;

  /**
   * Require authentication to access all `console` routes.
   *
   * @param {Transition} transition
   * @return {Promise}
   * @memberof ConsoleRoute
   */
  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'auth.login');

    return this.session.loadCurrentUser(transition);
  }
}
