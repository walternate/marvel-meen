import Ember from 'ember';

export default Ember.ObjectController.extend({
	viewDescription: function() {
		var desc = this.get('description');

		if( !desc || !desc.length ) {
			desc = 'Description not available.';
		}

		return desc;
	}.property('description')
});
