import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({

    authManager: service('auth-manager'),

    activate() {
        Ember.run.once(this, function() {
          this._super(...arguments);
          this.get('authManager').auth();
        })        
    }
});
