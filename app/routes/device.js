import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default Route.extend({

  websocket: service(),
  authManager: service('auth-manager'),

  init() {
    this._super(...arguments);
    this.get('websocket').socketRef.on('message', this.myMessageHandler, this);
  },

  myMessageHandler(event) {
    let msg =  JSON.parse(event.data);
    if (msg.cmd === 'rx') {
      this.get('store').createRecord('device-data', msg);
    }
    if (msg.cmd === 'get_devices_resp') {
      msg.devices_list.forEach( function(dev) {
        this.get('store').createRecord('device', dev);
      }, this);   
    }
  },

  beforeModel() {
    if (!this.get('authManager.isAuthentificated')) {
      this.transitionTo('login');
    } else {
      this.get('websocket').socketRef.send({
        cmd: 'get_devices_req',
      }, true);
    }
  },

  model() {    
    return this.get('store').findAll('device');
  }
});
