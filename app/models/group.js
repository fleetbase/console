import Model, { attr, hasMany } from '@ember-data/model';

export default class GroupModel extends Model {
    /** @attributes */
    @attr('string') name;

    /** @relationships */
    @hasMany('policy') policies;
    @hasMany('permission') permissions;
    @hasMany('user', { async: false }) users;
}
