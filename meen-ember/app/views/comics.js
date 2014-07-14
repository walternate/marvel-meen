import Ember from 'ember';

export default Ember.View.extend({
	templateName: 'views/comics',
	init: function() {
		var store = this.get('controller').get('store'),
			_this = this;

		store
			.find('comic', this.get('comicsId').id)
			.then(function(comic) {
				_this.set('comics', comic.get('items.content'));
			});

		store
			.find('series', this.get('seriesId').id)
			.then(function(serie) {
				_this.set('series', serie.get('items.content'));
			})

		store
			.find('story', this.get('storiesId').id)
			.then(function(story) {
				_this.set('stories', story.get('items.content'));
			})

		store
			.find('event', this.get('eventsId').id)
			.then(function(e) {
				_this.set('events', e.get('items.content'));
			});
	}
});
 