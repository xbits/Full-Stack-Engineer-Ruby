import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityRoute, {
  perPageParam: "limit",              // instead of "per_page"
  pageParam: "offset",                  // instead of "page"
  totalPagesParam: "meta.total",    // instead of "meta.total_pages"
  loadingUpvotes:true,

  model(params) {
    let infParams = Ember.assign(params,{ perPage: 12, startingPage: 1 });
    return this.infinityModel("comic", infParams);
  },

  afterInfinityModel(model) {
    let offset = model.get('meta.offset') + model.get('meta.count');
    this.set('currentPage',offset-2);
    this.set('loadingUpvotes',true);
  },

  renderTemplate: function(){
    this.render();

    this.render("character-search", {
      outlet: "nav-form",
      into: "application"
    });
  },

  actions:{
    searchCharacters(param){
      if(!param){return [];}
      return this.store.query('character', {nameStartsWith:param});
    },
    invalidateModel(){
      this.refresh();
    }
  }

});
