import { find, findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


// tests borrowed from ember-cli-jsoneditor - why reinvent the wheel? - thanks!!!
module('Integration | Component | json editor', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('json', { name: 'bob', threes: 'company' });
  });

  test('json loads', async function(assert) {
    await render(hbs`{{json-editor json=json}}`);

    assert.equal(this.$('.jsoneditor-values tbody > tr').text().trim(), "JSONEditor{2}name:bobthrees:company");
  });


  test('json', async function(assert) {
    assert.expect(2);

    await render(hbs`{{json-editor json=json onChange=(action (mut json))}}`);

    assert.equal(this.$('.jsoneditor-tree > div[contenteditable="true"]:last').text().trim(), 'company');

    this.set('json', {
      foo: 'foo'
    });

    assert.equal(this.$('.jsoneditor-tree > div[contenteditable="true"]:last').text().trim(), 'foo');
  });

  test('mode - tree', async function(assert) {
    await render(hbs`{{json-editor json=json mode='tree'}}`);
    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('Tree') > -1);
    assert.equal(this.$('.jsoneditor-tree > div[contenteditable="true"]:last').text().trim(), 'company');
  });

  test('mode - view', async function(assert) {
    await render(hbs`{{json-editor json=json mode='view'}}`);
    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('View') > -1);
    assert.equal(findAll('.jsoneditor-tree > div[contenteditable="false"]').length, 5);
  });

  test('mode - form', async function(assert) {
    await render(hbs`{{json-editor json=json mode='form'}}`);
    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('Form') > -1);
    assert.equal(findAll('.jsoneditor-tree > div[contenteditable="true"]').length, 2);
    assert.equal(this.$('.jsoneditor-tree > div[contenteditable="true"]:last').text().trim(), 'company');
  });

  test('mode - text', async function(assert) {
    await render(hbs`{{json-editor json=json mode='text'}}`);
    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('Text') > -1);
  });

  test('mode - code', async function(assert) {
    await render(hbs`{{json-editor json=json mode='code'}}`);
    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('Code') > -1);
  });
});