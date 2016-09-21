import Ember from 'ember';

const { inject: { service }, isEmpty, RSVP } = Ember;
/**
 * Makes currentUser.user available when injected
 */
export default Ember.Service.extend({
  session: service('session'),
  store: service(),
  load() {
    return new RSVP.Promise((resolve, reject) => {
      let userId = this.get('session.data.authenticated.id');
      if (!isEmpty(userId)) {
        return this.get('store').find('user', userId).then((user) => {
          this.set('user', user);
        },reject);
      } else {
        resolve();
      }
    });

  }
});
