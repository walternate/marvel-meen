import Ember from 'ember';

var Router = Ember.Router.extend({
  location: MeenEmberENV.locationType
});

Router.map(function() {
  	this.resource('characters', function() {
  		this.route('show', { path: '/:id' });
  	});
  this.route('characters/show');
});

export default Router;
