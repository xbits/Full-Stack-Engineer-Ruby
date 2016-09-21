//not really being used now
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  resourceURI: DS.attr('string'),
  comics: DS.hasMany('comic'),
  upvoted: DS.attr('boolean'), //upvoted by current user,
  totalUpvotes: DS.attr('boolean')
});
