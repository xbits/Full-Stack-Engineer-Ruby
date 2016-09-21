import DS from 'ember-data';
import Ember from 'ember';
/**
 * Consumes marvel data format
 * Backend server may attach some extra info to the payload respecting marvel format
 */
export default DS.JSONAPISerializer.extend({
  keyForAttribute(key) {
    return Ember.String.underscore(key);
  },
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {

    //move payload.data.results to payload.data
    var results = payload.data.results;
    delete payload.data.results;
    results = results.map((res) => {
      return this.normalizeModel(primaryModelClass.modelName, res);
    });

    //move non standard attrs to payload.meta
    var meta = {};
    for( var attr in payload.data){
      meta[attr] = payload.data[attr];
    }
    delete payload.data;
    for( attr in payload){
      meta[attr] = payload[attr];
      delete payload[attr];
    }

    payload.data = results;
    payload.meta = meta;

    if(meta.total && meta.count){
      meta.total_pages = Math.ceil(meta.total/meta.count);//set total pages for infinity scroller
    }
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  normalizeFindRecordResponse (store, primaryModelClass, payload, id, requestType){
    //marvel return an array
    //JSON API expects single record
    payload.data = payload.data[0];
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  normalizeModel(modelName,modelObj){
    var attrs = {};
    var relationships = {};
    for( var attr in modelObj){
      if(attr !== 'id' && attr !== 'type'){
        //lame way to find if attrbute is a has-many relationship
        //'available' is the number of related records in marvel server (side loaded or not)
        if(attr.available == undefined){
          attrs[attr] = modelObj[attr];
        }else{
          relationships[attr] = this.normalizeMarvelRelationship(modelObj[attr]);
        }
        delete modelObj[attr];
      }
    }

    modelObj.attributes = attrs;
    modelObj.type = modelObj.type || modelName;

    return modelObj;
  },
  normalizeMarvelRelationship(rel){
    var out = {};
    out.data = rel.items;
    delete rel.items;
    for( var item of out.data){
      item.type = Ember.String.pluralize(item.type);
    }
    let meta = {};
    for( var attr in rel){
      meta[attr] = rel[attr];
      delete rel[attr];
    }

    out.meta = meta;
    return out;
  }
});
