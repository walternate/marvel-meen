import DS from 'ember-data';

export default DS.Model.extend({
  series_id: DS.belongsTo('character'),
  available: DS.attr('number'),
  collectionURI: DS.attr('string'),
  items: DS.hasMany('item')
});
