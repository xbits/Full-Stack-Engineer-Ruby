import { moduleForModel, test } from 'ember-qunit';

moduleForModel('character', 'Unit | Model | character', {
  // Specify the other units that are required for this test.
  needs: ['model:comic']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});