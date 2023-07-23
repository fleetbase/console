import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ConsoleAdminBrandingController extends Controller {
    /**
     * Inject the `fetch` service.
     *
     * @memberof ConsoleAdminBrandingController
     */
    @service fetch;

    /**
     * Inject the `notifications` service.
     *
     * @memberof ConsoleAdminBrandingController
     */
    @service notifications;

    /**
     * Status of loading process.
     *
     * @memberof ConsoleAdminBrandingController
     */
    @tracked isLoading = false;

    /**
     * Unset a branding settings
     *
     * @param {String} key
     * @memberof ConsoleAdminBrandingController
     */
    @action unset(key, newValue = null) {
        this.model[key] = newValue;
    }

    /**
     * Save branding settings.
     *
     * @return {Promise}
     * @memberof ConsoleAdminBrandingController
     */
    @action save() {
        this.isLoading = true;

        return this.model
            .save()
            .then(() => {
                this.notifications.success('Branding settings saved.');
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    /**
     * Handle upload of new console icon
     *
     * @param {UploadFile} file
     * @memberof ConsoleAccountIndexController
     */
    @action uploadIcon(file) {
        this.isLoading = true;

        return this.fetch.uploadFile.perform(
            file,
            {
                path: `uploads/system`,
                type: `system`,
            },
            ({ url }) => {
                this.model.icon_url = url;
                this.isLoading = false;
            }
        );
    }

    /**
     * Handle upload of new console logo
     *
     * @param {UploadFile} file
     * @memberof ConsoleAccountIndexController
     */
    @action uploadLogo(file) {
        this.isLoading = true;

        return this.fetch.uploadFile.perform(
            file,
            {
                path: `uploads/system`,
                type: `system`,
            },
            ({ url }) => {
                this.model.logo_url = url;
                this.isLoading = false;
            }
        );
    }
}
