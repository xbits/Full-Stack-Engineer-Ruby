import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index');//it appears simple-auth plugin is asking for this path, useless otherwise
  this.route('comics',{ path: '/' });
  this.route('comic', { path: '/comics/:comic_id' });
  //this.route('characters');
  //this.route('upvotes');
  this.route('login');
  this.route('signup');
});

export default Router;
