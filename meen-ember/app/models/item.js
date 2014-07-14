import DS from 'ember-data';

export default DS.Model.extend({
	resourceURI: DS.attr('string'),
	name: DS.attr('string')
});
