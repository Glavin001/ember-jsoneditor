import { isEmpty, isEqual, isPresent } from '@ember/utils';
import { computed, observer } from '@ember/object';
import Component from '@ember/component';
import { bind }  from '@ember/runloop';
import JSONEditor from 'jsoneditor';

export default Component.extend({
  /**
  Element tag name.
  */
  tagName: 'div',

  /**
  Element classes.
  */
  classNames: ['jsoneditor-component'],

  /**
  Cached editor.
  */
  _editor: null,

  /**
  Passed parameters 
  */
  editor: null,


  /**
   Component is rendered on DOM, so
   we can create the editor
   */
  didInsertElement() {
    this._super(...arguments);
    let options = this.options;
    let json = this.json;
    let editor = new JSONEditor(this.element, options, json);

    if (this.expand)
      editor.expandAll();
      
    // set cached editor
    this.set('_editor', editor);
    this.set('editor', editor);
  },

  /**
   Tear down the editor if component
   is being destroyed
   */
  willDestroyElement() {
    this._super(...arguments);
    this.editor.destroy();
  },
  /**
  JSON object
  */
  json: null,

  /**
  Object with options
  */
  options: computed(
    'mode',
    'modes',
    'change',
    'search',
    'history',
    'name',
    'indentation',
    'error',
    function () {

      let props = {};

      props['history'] = this.history
      props['indentation'] = this.indentation;
      props['mode'] = this.mode;
      props['modes'] = this.modes;
      props['name'] = this.name;
      props['search'] = this.search;

      // https://balinterdi.com/blog/ember-dot-run-dot-bind/
      // assign internal change function to jsoneditor onChange
      props['onChange'] = bind(this, this._change);

      // assign internal error function to jsoneditor onError
      props['onError'] = bind(this, this._error);

      // set nodes if none passed in
      const modes = ['tree', 'view', 'form', 'text', 'code'];
      props.modes = isPresent(props.modes) ? props.modes : modes;

      return props;
    }),

  /**
  Editor mode. Available values:
  'tree' (default), 'view',
  'form', 'text', and 'code'
  */
  mode: 'tree',

  /**
  Create a box in the editor menu where the user can switch between the specified modes.
  Available values: see option mode.
  */
  modes: null,

  /**
  Callback method, triggered
  on change of contents
  */
  change: null,

  /**
   Set a callback method triggered when an error occurs.
   Invoked with the error as first argument.
   The callback is only invoked for errors triggered by a users action
  */
  error: null,

  /**
   Error event handler.
   Triggers `error()` which is user defined
   */
  _error:function(error) {
    if (this.error)
      this.error(error);
  },

  /**
  Editor updated JSON.
  */
  _updating: false,

  /**
  Change event handler.
  Triggers `change()` which is user defined
  */
  _change() {
    let editor = this._editor;

    if (isEmpty(editor)) {
      return;
    }
    try {
      let json = editor.get();
      //
      this.set('_updating', true);
      this.set('json', json);
      this.set('_updating', false);

      // Trigger Change event
      if (this.change) {
        this.change();
      }
    } catch (error) {
      this._error(error);
    }
  },

  /**
  Enable search box.
  True by default
  Only applicable for modes
  'tree', 'view', and 'form'
  */
  search: true,

  /**
  Enable history (undo/redo).
  True by default
  Only applicable for modes
  'tree', 'view', and 'form'
  */
  history: true,

  /**
  Field name for the root node.
  Only applicable for modes
  'tree', 'view', and 'form'
  */
  name: 'JSONEditor',

  /**
  Number of indentation
  spaces. 4 by default.
  Only applicable for
  modes 'text' and 'code'
  */
  indentation: 4,

  /**
  Editor did change.
  */
  editorDidChange: observer('editor', function () {

    // this.get('editor');
  }),

  /**
  JSON did change
  */
  jsonDidChange: observer('json', function () {
    if (isEqual(this._updating, false)) {
      let json = this.json;
      this.editor.set(json);
    }
  }),

  /**
  Mode did change
  */
  modeDidChange: observer('mode', function () {
    let mode = this.mode;
    this.editor.setMode(mode);
  }),

  /**
  Name did change
  */
  nameDidChange: observer('name', function () {
    let name = this.name;
    this.editor.setName(name);
  }),

});