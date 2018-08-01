import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({

    websockets: service(),

    isAuthentificated: null,

    auth() {
        if (this.get('isAuthentificated') === null) {
            var socket = this.get('websockets').socketFor('ws://lora.elecom-nt.ru:8002/');
            setTimeout(function () {    // нужен Promise
                socket.send({
                    cmd: 'auth_req',
                    login: 'arsenyperm',
                    password: '7469494244'
                }, true);
            }, 1000);
            this.set('isAuthentificated', true);
        }
    }
});
