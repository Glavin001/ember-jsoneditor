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

    // hacky, but this was simple using JQuery
    let jsonData = "";

    const rows = findAll('.jsoneditor-values tbody > tr')

    for (let i = 0; i < rows.length; i++){
      for (let j = 0; j < rows[i].cells.length; j++)
      {
        jsonData += rows[i].cells[j].textContent.trim();
      }
    }

    assert.equal(jsonData, "JSONEditor{2}name:bobthrees:company");
  });

  test('json', async function(assert) {
    assert.expect(2);

    await render(hbs`{{json-editor json=json onChange=(action (mut json))}}`);

    // prettier-ignore
    let content = find('.jsoneditor-tree').querySelectorAll('div[contenteditable="true"]');
    let last = content[content.length - 1].textContent.toString();
    assert.equal(last, 'company');

    // prettier-ignore
    this.set('json', { foo: 'foo' });
    content = find('.jsoneditor-tree').querySelectorAll(
      'div[contenteditable="true"]'
    );
    last = content[content.length - 1].textContent.toString();

    assert.equal(last, 'foo');
  });

  test('mode - tree', async function(assert) {
    await render(hbs`{{json-editor json=json mode='tree'}}`);

    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('Tree') > -1);

    const content = find('.jsoneditor-tree').querySelectorAll('div[contenteditable="true"]');
    const last = content[content.length - 1].textContent.toString();
    assert.equal(last, 'company');
  });

  test('mode - view', async function(assert) {
    await render(hbs`{{json-editor json=json mode='view'}}`);
    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('View') > -1);
    assert.dom('.jsoneditor-tree > div[contenteditable="false"]').exists({ count: 5 });
  });

  test('mode - form', async function(assert) {
    await render(hbs`{{json-editor json=json mode='form'}}`);
    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('Form') > -1);
    assert.dom('.jsoneditor-tree > div[contenteditable="true"]').exists({ count: 2 });

    const content = find('.jsoneditor-tree').querySelectorAll('div[contenteditable="true"]');
    const last = content[content.length - 1].textContent.toString();

    assert.equal(last, 'company');
  });

  test('mode - text', async function(assert) {
    await render(hbs`{{json-editor json=json mode='text'}}`);
    assert.ok(find('.jsoneditor-modes button').textContent.trim().indexOf('Text') > -1);
  });

  test('mode - code', async function(assert) {
    await render(hbs`{{json-editor json=json mode='code'}}`);

    assert.ok(
      find('.jsoneditor-modes')
        .querySelector('button')
        .textContent.trim()
        .indexOf('Code') > -1
    );
  });
});
