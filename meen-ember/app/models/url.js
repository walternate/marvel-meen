import DS from 'ember-data';

export default DS.Model.extend({
	url_id: DS.belongsTo("character"),
	url: DS.attr("string"),
	kind: DS.attr("string")
});
