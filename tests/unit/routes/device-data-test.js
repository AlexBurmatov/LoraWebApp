import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | device-data', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:device-data');
    assert.ok(route);
  });
});
