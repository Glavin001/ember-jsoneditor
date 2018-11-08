'use strict';

module.exports = {
  name: require('./package').name,
  included: function(app) {
    this._super.included.apply(this, arguments);

    // app.import(app.bowerDirectory + '/jsoneditor/dist/jsoneditor.js');
    app.import('node_modules/jsoneditor/dist/jsoneditor.css');
    app.import('node_modules/jsoneditor/dist/img/jsoneditor-icons.svg', {
      destDir: 'assets/img'
    });

  }
};
