import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  upvotable:null,
  actions:{
    toggleUpvote(){
      //TODO calls from component, not advised, not sure where it should go, adapter, service?
      let upvotable = this.get('upvotable');
      this.get('session').authorize('authorizer:devise', (headerName, headerValue) => {
        Ember.$.ajax({
          url: '/upvotes/toggle',
          beforeSend: function(xhr) {
            xhr.setRequestHeader(headerName, headerValue);
          },
          method: 'POST',
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          data: JSON.stringify({
            upvotable_id: upvotable.id,
            upvotable_type: 'comic' //TODO get model name instead of hard coded
          })
        }).then((response)=>{
          upvotable.set('upvoted',response.upvoted);
          upvotable.set('totalUpvotes',response.total_upvotes);
        });
      });
    }
  }
});
