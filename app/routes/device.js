import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default Route.extend({

  authManager: service('auth-manager'),

  beforeModel() {
    if (!this.get('authManager.isAuthentificated')) {
      this.transitionTo('login');
    }
  },

  model() {   
    var result = this.get('store').findAll('device');
    return result;
  }
});
