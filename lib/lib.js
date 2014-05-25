require('build/temp/template');

Ember.emberJsoneditor = Ember.Namespace.create();
Ember.emberJsoneditor.VERSION = '0.0.0';

Ember.libraries.register('ember-jsoneditor', Ember.emberJsoneditor.VERSION);

require('lib/scripts/index');
