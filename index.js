/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-jsoneditor',

  included: function(app) {
    this._super.included(app);

    app.import('bower_components/jsoneditor/jsoneditor.js');
    app.import('bower_components/jsoneditor/jsoneditor.css');
    app.import('bower_components/jsoneditor/img/jsoneditor-icons.png', {
      destDir: 'assets/img'
    });
  }
};
