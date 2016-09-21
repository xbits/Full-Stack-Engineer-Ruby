import { moduleForModel, test } from 'ember-qunit';

moduleForModel('upvote', 'Unit | Model | upvote', {
  // Specify the other units that are required for this test.
  needs: ['model:comic', 'model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
