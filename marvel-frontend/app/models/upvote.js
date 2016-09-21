import DS from 'ember-data';

export default DS.Model.extend({
  comic: DS.belongsTo('comic'),
  user: DS.belongsTo('user')
});
