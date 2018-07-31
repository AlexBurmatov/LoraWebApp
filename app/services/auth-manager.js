import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({

    websocket: service(),

    isAuthentificated: null,

    auth() {
        this.get('websocket').socketRef.send({
            cmd: 'auth_req',
            login: 'arsenyperm',
            password: '7469494244'
        }, true);
        this.set('isAuthentificated', true);
    }
});
