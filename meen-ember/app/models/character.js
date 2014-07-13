import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  modified: DS.attr('string', {
  	defaultValue: function() {
  		return new Date();
  	}
  }),
  
  resourcesURI: DS.attr('string'),

  thumbnail: DS.belongsTo("thumbnail"),

  comics: DS.belongsTo("comic"),

  series: DS.hasMany("series"),
});
