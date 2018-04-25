## Module Report
### Unknown Global

**Global**: `Ember.Handlebars`

**Location**: `tests/dummy/app/helpers/pretty-print.js` at line 3

```js
import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(value, replacer, space) {
  return JSON.stringify(value, replacer, space);
});
```
