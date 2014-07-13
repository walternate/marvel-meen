import Ember from 'ember';

export default Ember.View.extend({
	templateName: 'views/comics',
	init: function() {
		var store = this.get('controller').get('store'),
			_this = this;

		store
			.find('comic', this.get('comicsId').id)
			.then(function(comic) {
				console.log(comic.splice);
				console.log(comic.get('items.content'));
				_this.set('comics', comic.get('items.content'));
			});
	}
});
 