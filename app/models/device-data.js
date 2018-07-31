import DS from 'ember-data';

export default DS.Model.extend({
  'ack': DS.attr(),
  'cmd': DS.attr(),
  'data': DS.attr(),
  'devEui': DS.attr(),
  'dr': DS.attr(),
  'fcnt': DS.attr(),
  'freq': DS.attr(),
  'gatewayId': DS.attr(),
  'packetStatus': DS.attr(),
  'port': DS.attr(),
  'ts': DS.attr(),
  'type': DS.attr()
});
