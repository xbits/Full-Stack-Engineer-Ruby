import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  currentUser:  Ember.inject.service('current-user'),
  modalMessage:'',
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
