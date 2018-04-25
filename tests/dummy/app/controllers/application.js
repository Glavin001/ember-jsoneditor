import Controller from '@ember/controller';
import { computed }  from '@ember/object';

export default Controller.extend({
  modes: computed(() => ['tree','view','form','code','text']),
  mode: 'tree',
  name: 'JSONEditor'
});
