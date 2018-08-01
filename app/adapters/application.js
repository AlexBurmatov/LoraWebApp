import DS from 'ember-data';
import { inject as service } from '@ember/service';

export default DS.JSONAPIAdapter.extend({

    websockets: service(),

    packet: null,

    init() {
        this._super(...arguments);
        var socket = this.get('websockets').socketFor('ws://lora.elecom-nt.ru:8002/');
        if (socket.readyState) {
            socket.on('message', function(event) {
                console.log('Message: ' + event.data);   
                this.packet = this.parsePacket(JSON.parse(event.data));                                                                                       
            }, this);
            socket.on('close', function(event) { 
                socket = this.get('websockets').socketFor('ws://lora.elecom-nt.ru:8002/');
                later(this, () => {
                    socket.reconnect();
                }, 1000);
            }, this);
        }
    },

    findAll() {
        var socket = this.get('websockets').socketFor('ws://lora.elecom-nt.ru:8002/');
        socket.send({
            cmd: 'get_devices_req',
          }, true);        
        return {data: this.packet};        
    },

    query(store, type, query) {
        var socket = this.get('websockets').socketFor('ws://lora.elecom-nt.ru:8002/');
        //if (type === 'device-data') {
            socket.send({
                cmd: 'get_data_req',
                devEui: query.devEui,
                select: {
                    limit: 100
                }
            }, true);
        //}        
        return {data: this.packet};
    },

    parsePacket(message) {
        var list = [];
        switch(message.cmd) {
            case 'get_devices_resp': {
                message.devices_list.forEach(function(dev){
                    var obj = {
                        id: dev.devEui,
                        type: 'device',
                        attributes: {
                            'devName': dev.devName,
                            'devEui': dev.devEui,
                            'class': dev.class,
                            'last_data_ts': new Date(dev.last_data_ts),
                        }
                    }
                    list.push(obj);
                });
                this.get('store').push({data: list});
                return list;
            }

            case 'get_data_resp': {
                message.data_list.forEach(function(frame){
                    var obj = {
                        id: message.devEui + frame.fcnt,
                        type: 'device-data',
                        attributes: {
                            'ack': frame.ack,
                            '_data': frame.data,
                            'devEui': message.devEui,
                            'dr': frame.dr,
                            'fcnt': frame.fcnt,
                            'freq': frame.freq,
                            'gatewayId': frame.gatewayId,
                            'packetStatus': frame.packetStatus,
                            'port': frame.port,
                            'ts': frame.ts,
                            'type': frame.type
                        }
                    }
                    list.push(obj);
                });
                this.get('store').push({data: list});
                return list;
            }

            case 'rx': {
                var obj = {
                    id: message.devEui+message.fcnt,
                    type: 'device-data',
                    attributes: {
                        'ack': message.ack,
                        '_data': message.data,
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
                return obj;
            }
        }
    }
});
