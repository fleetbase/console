import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ConfigureDatabaseComponent extends Component {
    @service fetch;
    @tracked isLoading;
    @tracked mysqlConnectionResponse;

    @tracked mysqlConfig = {
        DB_PREFIX: 'fleetbase',
        DB_HOST: '127.0.0.1',
        DB_PORT: '3306',
        DB_DATABASE: 'fleetbase',
        DB_USERNAME: 'root',
        DB_PASSWORD: '',
        DB_URL: null,
        SANDBOX_DB_PORT: null,
        PDO_OPTIONS: {},
    };

    @tracked redisConfig = {
        REDIS_HOST: '127.0.0.1',
        REDIS_PORT: '6379',
        REDIS_DATABASE: '0',
        REDIS_PASSWORD: null,
        REDIS_URL: null,
    };

    @action setOption(configKey, key, { target: { value } }) {
        this[configKey][key] = value;
    }

    @action addMysqlOption() {
        const options = { ...this.mysqlConfig.MYSQL_OPTIONS };
        options[0] = 0;

        this.mysqlConfig = { ...this.mysqlConfig, MYSQL_OPTIONS: options };
    }

    @action testMysqlConnection() {
        this.fetch.post('settings/test-mysql-connection', this.mysqlConfig).then((response) => {
            this.mysqlConnectionResponse = response;
        });
    }

    @action testRedisConnection() {}

    @action save() {}
}
