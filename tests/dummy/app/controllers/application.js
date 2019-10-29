import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  modes: computed(function() {
    return ['tree', 'view', 'form', 'code', 'text'];
  }),
  mode: 'tree',
  name: 'JSONEditor'
});
