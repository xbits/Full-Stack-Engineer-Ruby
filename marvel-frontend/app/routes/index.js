import Ember from 'ember';

//this route is a patch for simple-auth call for index after signup
export default Ember.Route.extend({
  redirect: function() {
    this.transitionTo('application');
  }
});
