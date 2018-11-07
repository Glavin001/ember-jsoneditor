"use strict";

const EmberAddon = require("ember-cli/lib/broccoli/ember-addon");

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    autoImport: {
      alias: {
        jsoneditor: "jsoneditor/dist/jsoneditor"
      }
    }
  });
  return app.toTree();
};
