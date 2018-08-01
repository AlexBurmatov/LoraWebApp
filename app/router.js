import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('device');
  this.route('about');
  this.route('login');
  this.route('report');
  this.route('device-data', { path: '/device-data/:device_id' });
});

export default Router;
