import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default Service.extend({

    websockets: service(),
    socketRef: null,

    init() {
        this._super(...arguments);
        var socket = this.get('websockets').socketFor('ws://lora.elecom-nt.ru:8002/');
        socket.on('open', this.myOpenHandler, this);
        //socket.on('message', this.myMessageHandler, this);
        socket.on('close', this.myCloseHandler, this);
        this.socketRef = socket;
    },

    messages: [],

    myOpenHandler: function(event) {
        console.log('On open event has been called: ' + event);
    },

    myMessageHandler: function(event) {
        console.log('Message: ' + event.data);
        this.messages.push(event.data);
        //this.set('message', event.data);
    },

    myCloseHandler: function(event) {
        const socket = this.socketService.socketFor('ws://lora.elecom-nt.ru:8002/');
        later(this, () => {
            socket.reconnect();
        }, 1000);
    }
});
