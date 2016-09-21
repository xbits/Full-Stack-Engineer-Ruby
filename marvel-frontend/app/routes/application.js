import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
  currentUser: service(),
  ignoreNextModalClose: false,

  beforeModel() {
    this._loadCurrentUser();
  },
  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser();//.catch(() => this.get('session').invalidate());
  },

  _loadCurrentUser() {
    return this.get('currentUser').load();
  },
  willTransition: function(transition) {
    this.controller.set('isModalOpen',false);
  },
  actions:{
    showLogin(requesterMsg){
      return this.send('openModal', 'login', requesterMsg);
    },
    showSignup(requesterMsg){
      this.transitionTo('signup');
    },
    openModal(modalName, msg) {
      this.send('closeModal');

      this.controller.set('modalMessage', msg);
      this.controller.set('isModalOpen', true);
      return this.render(modalName, {
        into: 'application',
        outlet: 'mainModal'
      });
    },
    closeModal() {
      this.controller.set('modalMessage', '');
      this.controller.set('isModalOpen', false);
      return this.disconnectOutlet({
        outlet: 'mainModal',
        parentView: 'application'
      });
    }
  }

});
