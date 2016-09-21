import Ember from 'ember';
export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    save(user){
      let newUser = user;

        var serialized = newUser.serialize();
        serialized = serialized.data.attributes;//TODO fix serializer either here or on the api, to set correct root
      Ember.$.post('/users',{user: serialized})
        .catch((error) => {
            let msg = error.responseText || error;
            if(error.responseJSON && error.responseJSON.errors){
              msg = error.responseJSON.errors;
              if(msg instanceof Array){
                msg = error.responseJSON.errors.join('<br/>');
              }else if(msg.full_messages){
                msg = msg.full_messages.join('<br/>');
              }
            }
            this.set('signUpMessage', msg)
        })
        .then((resp)=>{
            this.get('session')
              .authenticate('authenticator:devise', serialized.email, serialized.password);//TODO use identification instead of email
              .catch((reason) => {
                this.set('loginMessage', 'Login failed');
              });
          //this.get('session')
        })
    }

  }//end actions

});
