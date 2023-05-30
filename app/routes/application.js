import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import isElectron from '@fleetbase/ember-core/utils/is-electron';
import pathToRoute from '@fleetbase/ember-core/utils/path-to-route';

export default class ApplicationRoute extends Route {
    @service session;
    @service theme;
    @service fetch;
    @service urlSearchParams;
    @service modalsManager;
    // @service intl;

    /**
     * Check the installation status of Fleetbase and transition user accordingly.
     *
     * @return {void|Transition}
     * @memberof ApplicationRoute
     */
    async init() {
        super.init(...arguments);
        const { shouldInstall, shouldOnboard } = await this.checkInstallationStatus();

        if (shouldInstall) {
            return this.transitionTo('install');
        }

        if (shouldOnboard) {
            return this.transitionTo('onboard');
        }
    }

    /**
     * Sets up session and handles redirects
     *
     * @param {Transition} transition
     * @return {Transition}
     * @memberof ApplicationRoute
     */
    async beforeModel() {
        await this.session.setup();

        const { isAuthenticated } = this.session;
        const shift = this.urlSearchParams.get('shift');

        if (isAuthenticated && shift) {
            return this.transitionTo(pathToRoute(shift));
        }
    }

    /**
     * On application route activation
     *
     * @memberof ApplicationRoute
     * @void
     */
    activate() {
        const bodyClassNames = [];

        if (isElectron()) {
            bodyClassNames.pushObject(['is-electron']);
        }

        this.theme.initialize({ bodyClassNames });
        // this.intl.setLocale(['en-us']);
    }

    /**
     * Checks to determine if Fleetbase should be installed or user needs to onboard.
     *
     * @return {Promise}
     * @memberof ApplicationRoute
     */
    checkInstallationStatus() {
        return this.fetch.get('installer/initialize');
    }
}
