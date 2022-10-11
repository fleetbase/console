import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') public_id;
  @attr('string') name;
  @attr('string', {
    defaultValue:
      'https://s3.ap-southeast-1.amazonaws.com/flb-assets/static/no-avatar.png',
  })
  avatar_url;
  @attr('string') email;
  @attr('string') password;
  @attr('string') phone;
  @attr('string') company_name;
  @attr('string') date_of_birth;
  @attr('string') timezone;
  @attr('string') country;
  @attr('string') ip_address;
  @attr('string') slug;
  @attr('string') type;
  // @attr('raw') types;
  @attr('string') status;
}

// import Model, { attr } from '@ember-data/model';
// import { computed } from '@ember/object';
// import { not } from '@ember/object/computed';
// import { getOwner } from '@ember/application';
// // import { format, formatDistanceToNow } from 'date-fns';
// // import autoSerialize from '../utils/auto-serialize';
// // import moment from 'moment';

// export default class User extends Model {
//     @attr('string') public_id;
//     @attr('string') company_uuid;
//     @attr('string') avatar_uuid;

//     /** @attributes */
//     @attr('string') company_name;
//     @attr('string', { defaultValue: 'https://s3.ap-southeast-1.amazonaws.com/flb-assets/static/no-avatar.png' }) avatar_url;
//     @attr('string') email;
//     @attr('string') password;
//     @attr('string') name;
//     @attr('string') phone;
//     @attr('string') date_of_birth;
//     @attr('string') timezone;
//     @attr('string') country;
//     @attr('string') ip_address;
//     @attr('string') slug;
//     @attr('string') type;
//     @attr('raw') types;
//     @attr('string') status;
//     @attr('string') session_status;
//     @attr('boolean') is_admin;

//     /** @dates */
//     @attr('date') phone_verified_at;
//     @attr('date') email_verified_at;
//     @attr('date') last_login;
//     @attr('date') deleted_at;
//     @attr('date') created_at;
//     @attr('date') updated_at;

//     /** @methods */
//     // deactivate() {
//     //     const owner = getOwner(this);
//     //     const fetch = owner.lookup(`service:fetch`);

//     //     return new Promise((resolve, reject) => {
//     //         return fetch
//     //             .patch(`users/deactivate/${this.id}`)
//     //             .then((response) => {
//     //                 this.session_status = 'inactive';

//     //                 resolve(response);
//     //             })
//     //             .catch((error) => {
//     //                 reject(error);
//     //             });
//     //     });
//     // }

//     // activate() {
//     //     const owner = getOwner(this);
//     //     const fetch = owner.lookup(`service:fetch`);

//     //     return new Promise((resolve, reject) => {
//     //         return fetch
//     //             .patch(`users/activate/${this.id}`)
//     //             .then((response) => {
//     //                 this.session_status = 'active';

//     //                 resolve(response);
//     //             })
//     //             .catch(reject);
//     //     });
//     // }

//     // removeFromCurrentCompany() {
//     //     const owner = getOwner(this);
//     //     const fetch = owner.lookup(`service:fetch`);

//     //     return new Promise((resolve, reject) => {
//     //         return fetch.delete(`users/remove-from-company/${this.id}`).then(resolve).catch(reject);
//     //     });
//     // }

//     // resendInvite() {
//     //     const owner = getOwner(this);
//     //     const fetch = owner.lookup(`service:fetch`);

//     //     return new Promise((resolve, reject) => {
//     //         return fetch
//     //             .post(`users/resend-invite`, { user: this.id })
//     //             .then((response) => {
//     //                 resolve(response);
//     //             })
//     //             .catch(reject);
//     //     });
//     // }

//     // /** @computed */
//     // @computed('types') get typesList() {
//     //     console.log(this.types);
//     //     const types = Array.from(this.types);
//     //     return types.join(', ');
//     // }

//     // // @computed('email_verified_at') get isEmailVerified() {
//     // //     return this.email_verified_at && moment(this.email_verified_at).isValid();
//     // // }

//     // // @computed('phone_verified_at') get isPhoneVerified() {
//     // //     return this.phone_verified_at && moment(this.phone_verified_at).isValid();
//     // // }

//     // // @not('isEmailVerified') emailIsNotVerified;

//     // // @not('isPhoneVerified') phoneIsNotVerified;

//     // @computed('last_login') get lastLogin() {
//     //     if (!this.last_login || !moment(this.last_login).isValid()) {
//     //         return 'Never';
//     //     }

//     //     return moment.unix(this.last_login).format('LLL');
//     // }

//     // @computed('updated_at') get updatedAgo() {
//     //     return formatDistanceToNow(this.updated_at);
//     // }

//     // @computed('updated_at') get updatedAt() {
//     //     return format(this.updated_at, 'PPP p');
//     // }

//     // @computed('updated_at') get updatedAtShort() {
//     //     return format(this.updated_at, 'PP');
//     // }

//     // @computed('created_at') get createdAgo() {
//     //     return formatDistanceToNow(this.created_at);
//     // }

//     // @computed('created_at') get createdAt() {
//     //     return format(this.created_at, 'PPP p');
//     // }

//     // @computed('created_at') get createdAtShort() {
//     //     return format(this.created_at, 'PP');
//     // }

//     // toJSON() {
//     //     return autoSerialize(this, ['serviceArea']);
//     // }
// }
