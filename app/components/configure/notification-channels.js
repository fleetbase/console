import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ConfigureNotificationChannelsComponent extends Component {
    @service fetch;
    @service notifications;
    @tracked isLoading = false;
    @tracked testResponse;
    @tracked testTitle = 'Hello World from Fleetbase 🚀';
    @tracked testMessage = 'This is a test push notification!';
    @tracked apnToken;
    @tracked fcmToken;
    @tracked apn = {
        key_id: '',
        team_id: '',
        app_bundle_id: '',
        private_key_content: '',
        production: true,
    };
    @tracked fcm = {
        firebase_credentials_json: '',
        firebase_database_url: '',
        firebase_project_name: '',
    };

    constructor() {
        super(...arguments);
        this.loadConfigValues();
    }

    @action setConfigValues(config) {
        for (const key in config) {
            if (this[key] !== undefined) {
                this[key] = config[key];
            }
        }
    }

    @action loadConfigValues() {
        this.isLoading = true;

        this.fetch
            .get('settings/notification-channels-config')
            .then((response) => {
                this.setConfigValues(response);
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    @action save() {
        this.isLoading = true;

        this.fetch
            .post('settings/notification-channels-config', {
                apn: this.apn,
            })
            .then(() => {
                this.notifications.success("Notification channel's configuration saved.");
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    @action test() {
        this.isLoading = true;

        this.fetch
            .post('settings/test-notification-channels-config', {
                apn: this.apn,
                title: this.testTitle,
                message: this.testMessage,
                apnToken: this.apnToken,
                fcmToken: this.fcmToken,
            })
            .then((response) => {
                this.testResponse = response;
            })
            .finally(() => {
                this.isLoading = false;
            });
    }
}
