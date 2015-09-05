import Ember from "ember";

export default Ember.Controller.extend({
  modes: ['tree','view','form','code','text'],
  mode: 'tree',
  name: 'JSONEditor'
});
