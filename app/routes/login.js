import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({

    authManager: service('auth-manager'),

    activate() {
        this.get('authManager').auth();
    }
});
