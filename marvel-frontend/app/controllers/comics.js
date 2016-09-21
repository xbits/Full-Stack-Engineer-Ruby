import Ember from 'ember';
const { computed } = Ember;
import ApplicationController from './application';

export default ApplicationController.extend({

  queryParams: ['limit','orderBy','characters'],
  limit: 10,
  orderBy:'-onsaleDate',
  characters:null,
  selectedCharacter: computed('characters', function(){
    if(!this.get('characters')){return null;}
    return this.store.findRecord('character',this.get('characters'));
  }),

  actions:{
    searchCharacters(param){

      if(!param){return [];}
      return this.store.query('character', {nameStartsWith:param});
    },
    filterByCharacter(param){
      if(param){
        this.set('characters',param.id);
      }else{
        this.set('characters',null);
      }
      this.send('invalidateModel');
    }
  }
});
