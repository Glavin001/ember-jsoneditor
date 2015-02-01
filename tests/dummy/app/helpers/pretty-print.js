import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(value, replacer, space) {
  return JSON.stringify(value, replacer, space);
});
