import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    description: DS.attr('string'),
    format:DS.attr('string'),
    thumbnail: DS.attr(),
    pageCount: DS.attr('number'),
    upvoted: DS.attr('boolean'),
    totalUpvotes: DS.attr('number'),
    urls: DS.attr(),
    dates:DS.attr(),
    prices:DS.attr(),
    characters: DS.hasMany('character', { async: true })
});
