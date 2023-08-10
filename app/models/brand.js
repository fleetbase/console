import Model, { attr } from '@ember-data/model';

export default class BrandModel extends Model {
    @attr('string') uuid;
    @attr('string') icon_url;
    @attr('string') logo_url;
    @attr('string') default_theme;
}
