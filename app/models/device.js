import DS from 'ember-data';

export default DS.Model.extend({
  devName: DS.attr(),
  devEui: DS.attr(),
  class: DS.attr(),
  last_data_ts: DS.attr('date'),
  devData: DS.hasMany('device-data'),

  last_data_ts_strokoi: Ember.computed('last_data_ts', function() {
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return this.get('last_data_ts').toLocaleString("ru", options);
  })
});