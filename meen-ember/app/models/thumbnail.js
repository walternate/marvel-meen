import DS from 'ember-data';

export default DS.Model.extend({
  	thumbnail_id: DS.belongsTo('character'),
  	path: DS.attr('string'),
  	extension: DS.attr('string'),
  	src: function() {
  		return this.get('path') + '.' + this.get('extension');
  	}.property('path', 'extension')
});
