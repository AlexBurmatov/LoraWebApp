import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
/*
    websockets: service(),

    init: function() {  
        var self = this;

        var socket = this.get('websockets').socketFor('ws://lora.elecom-nt.ru:8002/');

        if (socket.readyState) {
            socket.on('message', function(event) {  
                console.log('Message: ' + event.data);   
                this.parsePacket(JSON.parse(event.data));                                                                                              
            }, this);
            socket.on('close', function(event) { 
                socket = this.get('websockets').socketFor('ws://lora.elecom-nt.ru:8002/');
                later(this, () => {
                    socket.reconnect();
                }, 1000);
            }, this);
        }   
    },

    parsePacket(message) {
        switch(message.cmd) {
            case 'get_devices_resp': {
                var list = [];
                message.devices_list.forEach(function(dev){
                    var obj = {
                        id: dev.devEui,
                        type: 'device',
                        attributes: {
                            devName: dev.devName,
                            devEui: dev.devEui,
                            class: dev.class,
                            last_data_ts: new Date(dev.last_data_ts),
                        }
                    }
                    list.push(obj);
                });
                this.get('store').push({data: list});
                break;
            }

            case 'rx': {
                var obj = {
                    id: message.devEui+message.fcnt,
                    type: 'device-data',
                    attributes: {
                        'ack': message.ack,
                        'data': message.data,
                        'devEui': message.devEui,
                        'dr': message.dr,
                        'fcnt': message.fcnt,
                        'freq': message.freq,
                        'gatewayId': message.gatewayId,
                        'packetStatus': message.packetStatus,
                        'port': message.port,
                        'ts': message.ts,
                        'type': message.type
                    }
                }
                this.get('store').push({data: obj});
                break;
            }
        }
    }*/
});
