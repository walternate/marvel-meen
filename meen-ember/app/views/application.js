import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		return Ember.$(document).foundation();
	}
});
