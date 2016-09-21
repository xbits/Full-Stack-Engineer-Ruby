import DS from 'ember-data';
import Ember from 'ember';
//import ENV from 'bookstore/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
 // host: ENV.API_GATEWAY,
  serverTokenEndpoint: 'http://localhost:3000/users/sign_in',
  authorizer: 'authorizer:devise',
  pathForType: function(type) {
    return Ember.String.pluralize(Ember.String.underscore(type));
  }
});
