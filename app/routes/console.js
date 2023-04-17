import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import '@fleetbase/leaflet-routing-machine';

export default class ConsoleRoute extends Route {
    /**
     * Inject the `fetch` service
     *
     * @var {Service}
     */
    @service fetch;

    /**
     * Inject the `session` service
     *
     * @var {Service}
     */
    @service session;

    /**
     * Inject the `currentUser` service
     *
     * @var {Service}
     */
    @service currentUser;

    @action willTransition(transition) {
        if (transition.to.name.startsWith('console.fleet-ops')) {
            import('@fleetbase/leaflet-routing-machine');
        }
    }

    /**
     * Require authentication to access all `console` routes.
     *
     * @param {Transition} transition
     * @return {Promise}
     * @memberof ConsoleRoute
     */
    @action async beforeModel(transition) {
        this.session.requireAuthentication(transition, 'auth.login');

        return this.session.loadCurrentUser(transition);
    }

    /**
     * We will use this hook to preload engines
     *
     * @void
     */
    @action afterModel() {
        this.fetchSessionInfo();
    }

    /**
     * We will use this hook to setup controller and more
     *
     * @void
     */
    @action setupController(controller, model) {
        super.setupController(controller, model);

        this.fetch.get('auth/organizations').then((organizations) => {
            this.currentUser.setOption('organizations', organizations);
            controller.organizations = organizations;
        });
    }

    /**
     * Use this hook to fetch user related queries
     *
     * @void
     */
    @action fetchSessionInfo() {
        this.fetch.shouldResetCache();
        this.fetch
            .cachedGet(
                'lookup/whois',
                {},
                {
                    expirationInterval: 60,
                    expirationIntervalUnit: 'minutes',
                }
            )
            .then((whois) => {
                this.currentUser.setOption('whois', whois);
            });
    }
}
