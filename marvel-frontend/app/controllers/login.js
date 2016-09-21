import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  showSignup:'showSignup',
  onDone:'closeModal',
  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session')
        .authenticate('authenticator:devise', identification, password)
        .catch((reason) => {
          this.set('errorMessage', reason.error || reason);
        }).then(()=>{

        });
    },
    goToSignup(){
      this.send('closeModal');//this lacks abstraction and should not be here
      this.send('showSignup');
    }

  }
});
