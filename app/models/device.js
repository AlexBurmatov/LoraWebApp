import DS from 'ember-data';

export default DS.Model.extend({
  devName: DS.attr(),
  devEui: DS.attr(),
  devData: DS.hasMany('device-data'),
});