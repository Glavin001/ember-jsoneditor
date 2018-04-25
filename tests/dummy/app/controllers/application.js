import Controller from '@ember/controller';

export default Controller.extend({
  modes: ['tree','view','form','code','text'],
  mode: 'tree',
  name: 'JSONEditor'
});
