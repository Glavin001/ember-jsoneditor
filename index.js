"use strict";
/* eslint node/no-extraneous-require: 0 */
var path = require("path");
var Funnel = require("broccoli-funnel");
var MergeTrees = require("broccoli-merge-trees");

module.exports = {
  name: require("./package").name,

  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import("vendor/jsoneditor.css");
    app.import("vendor/jsoneditor-icons.svg", {
      destDir: "assets/img"
    });
  },

  treeForVendor(/* vendorTree */) {
    let cssTree = new Funnel(
      path.join(this.project.root, "node_modules", "jsoneditor/dist"),
      {
        files: ["jsoneditor.css"]
      }
    );

    let iconTree = new Funnel(
      path.join(this.project.root, "node_modules", "jsoneditor/dist/img"),
      {
        files: ["jsoneditor-icons.svg"]
      }
    );

    return new MergeTrees([cssTree, iconTree]);
  }
};
