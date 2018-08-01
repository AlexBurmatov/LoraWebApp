import Route from '@ember/routing/route';

export default Route.extend({

    model(params) {   
        var result = this.get('store').query('device-data', { devEui: params.device_id });
        console.log(result);
        return result;
      }
});
