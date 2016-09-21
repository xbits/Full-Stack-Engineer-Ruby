import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPISerializer.extend({
  payloadKeyFromModelName: function(modelName) {
    return Ember.String.underscore(Ember.String.decamelize(modelName));
  },
  keyForAttribute: function(attr, method) {
    return Ember.String.underscore(Ember.String.decamelize(attr));
  }
});
