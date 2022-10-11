import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { action, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { classify } from '@ember/string';
import { isArray } from '@ember/array';
import first from '@fleetbase/ember-core/utils/first';

export default class ConsoleController extends Controller {
    /**
     * Inject the `currentUser` service.
     *
     * @var {Service}
     */
    @service currentUser;

    /**
     * Inject the `modalsManager` service.
     *
     * @var {Service}
     */
    @service modalsManager;

    /**
     * Inject the `session` service.
     *
     * @var {Service}
     */
    @service session;

    /**
     * Inject the `fetch` service.
     *
     * @var {Service}
     */
    @service fetch;

    /**
     * Inject the `notifications` service.
     *
     * @var {Service}
     */
    @service notifications;

    /**
     * Authenticated user organizations.
     *
     * @var {Array}
     */
    @tracked organizations = [];

    /**
     * Installed extensions.
     *
     * @var {Array}
     */
    @computed() get extensions() {
        return getOwner(this).application.extensions;
    }

    /**
     * Get the currently authenticated user
     *
     * @var {Model}
     */
    @alias('currentUser.user') user;

    /**
     * Action handler.
     *
     * @void
     */
    @action onAction(action, ...params) {
        if (typeof this[action] === 'function') {
            this[action](...params);
        }
    }

    /**
     * Action to invalidate and log user out
     *
     * @void
     */
    @action invalidateSession() {
        this.session.invalidateWithLoader();
    }

    /**
     * Action to invalidate and log user out
     *
     * @void
     */
    @action createOrJoinOrg() {
        const currency = this.currentUser.currency;
        const country = this.currentUser.country;

        this.modalsManager.show('modals/create-or-join-org', {
            title: 'Create or join a organization',
            acceptButtonText: 'Confirm',
            acceptButtonIcon: 'check',
            acceptButtonIconPrefix: 'fas',
            action: 'join',
            next: null,
            name: null,
            decription: null,
            phone: null,
            currency,
            country,
            timezone: null,
            confirm: (modal) => {
                modal.startLoading();

                const { action, next, name, description, phone, currency, country, timezone } = modal.getOptions();

                if (action === 'join') {
                    return this.fetch.post('auth/join-organization', { next }).then(() => {
                        this.fetch.flushRequestCache('auth/organizations');
                        this.notifications.success('You have joined a new organization!');
                        setTimeout(() => {
                            window.location.reload();
                        }, 900);
                    });
                }

                return this.fetch
                    .post('auth/create-organization', {
                        name,
                        description,
                        phone,
                        currency,
                        country,
                        timezone,
                    })
                    .then(() => {
                        this.fetch.flushRequestCache('auth/organizations');
                        this.notifications.success('You have created a new organization!');
                        setTimeout(() => {
                            window.location.reload();
                        }, 900);
                    });
            },
        });
    }

    /**
     * Confirm prompt for user to switch organization
     *
     * @void
     */
    @action switchOrganization(organization) {
        if (isArray(organization)) {
            organization = first(organization);
        }

        this.modalsManager.confirm({
            title: `Are you sure you want to switch organization to ${organization.name}?`,
            body: `By confirming your account will remain logged in, but your primary organization will be switched.`,
            acceptButtonText: `Yes, I want to switch organization`,
            acceptButtonScheme: 'primary',
            confirm: (modal) => {
                modal.startLoading();

                return this.fetch
                    .post('auth/switch-organization', { next: organization.uuid })
                    .then(() => {
                        this.fetch.flushRequestCache('auth/organizations');
                        this.notifications.success('You have switched organizations');
                        setTimeout(() => {
                            window.location.reload();
                        }, 900);
                    })
                    .catch((error) => {
                        this.notifications.serverError(error);
                    });
            },
        });
    }
}
