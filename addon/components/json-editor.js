/* global JSONEditor */
import Ember from 'ember';

export default Ember.Component.extend({
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
  _editor: undefined,
  /**

  */
  editor: Ember.computed('options', 'json', function() {
    var self = this;
    var editor = self.get('_editor');
    // console.log('editor', editor);
    if (Ember.isEmpty(editor)) {
      // Empty, create it.
      var container = self.$().get(0);
      // console.log('container', self.$(), container);
      if (Ember.isEmpty(container)) {
        return undefined;
      } else {
        var options = self.get('options');
        var json = self.get('json');
        editor = new JSONEditor(container, options, json);
        // console.log('new editor', editor);
        self.set('_editor', editor);
        return editor;
      }
    } else {
      // Editor is already created and cached.
      return editor;
    }
  }),

  /**
  JSON object.
  */
  json: {},

  /**
  Object with options.
  */
  options: Ember.computed(
    'mode',
    'modes',
    '_change',
    'search',
    'history',
    'name',
    'indentation',
    'error',
    function() {
      // console.log('options');

      var props = this.getProperties([
        'mode',
        'modes',
        '_change',
        'search',
        'history',
        'name',
        'indentation',
        'error'
      ]);
      // Rename
      props.change = props._change;
      delete props._change;
      // Add reference to this component
      props.component = this;
      return props;
    }),

  /**
  Editor mode. Available values:
  'tree' (default), 'view',
  'form', 'text', and 'code'.
  */
  mode: 'tree',

  /**
  Create a box in the editor menu where the user can switch between the specified modes.
  Available values: see option mode.
  */
  modes: ['tree', 'view', 'form', 'text', 'code'],

  /**
  Callback method, triggered
  on change of contents
  */
  change: function() {
    // console.log('JSON Editor changed!');
  },

  /**
   Set a callback method triggered when an error occurs.
   Invoked with the error as first argument.
   The callback is only invoked for errors triggered by a users action.
  */
  error: function(error) {
    // console.error('An error occured: ', error);
  },

  /**
  Editor updated JSON.
  */
  _updating: false,

  /**
  Change event handler.
  Triggers `change()` which is user defined.
  */
  _change: function() {
    // console.log('_change', this);

    var self = this.component;
    var editor = self.get('_editor');
    if (Ember.isEmpty(editor)) {
      return;
    }
    try {
      var json = editor.get();
      //
      self.set('_updating', true);
      self.set('json', json);
      self.set('_updating', false);
      // Trigger Change event
      if (!!self.change) {
        self.change();
      }
    } catch (error) {
      self.error(error);
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
  Editor observer.
  */
  editorDidChange: Ember.observer('editor', function() {
    // console.log('editorDidChange');
    var self = this;
    self.get('editor');
  }),
  didInsertElement: function() {
    // console.log('didInsertElement');
    this.get('editor');
  },

  /**
  JSON observer.
  */
  jsonDidChange: Ember.observer('json', function() {
    // console.log('jsonDidChange');
    var self = this;
    if (Ember.isEqual(self.get('_updating'), false)) {
      var editor = self.get('editor');
      var json = self.get('json');
      editor.set(json);
    }
  }),

  /**
  Mode observer.
  */
  modeDidChange: Ember.observer('mode', function() {
    // console.log('modeDidChange');
    var self = this;
    var editor = self.get('editor');
    var mode = self.get('mode');
    editor.setMode(mode);
  }),

  /**
  Name observer.
  */
  nameDidChange: Ember.observer('name', function() {
    // console.log('nameDidChange');
    var self = this;
    var editor = self.get('editor');
    var name = self.get('name');
    editor.setName(name);
  }),

});