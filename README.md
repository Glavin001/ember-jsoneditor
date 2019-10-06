# Ember JSON Editor [![npm version](https://badge.fury.io/js/ember-jsoneditor.svg)](http://badge.fury.io/js/ember-jsoneditor)

> Ember component for [JSON Editor](https://github.com/josdejong/jsoneditor/) to view, edit and format JSON.

**Live demo**: http://glavin001.github.io/ember-jsoneditor/

---
## Installation

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above

Previous versions compatibility
* ember-json-editor v9.3 - Ember.js 2.4 and above

Installation
------------------------------------------------------------------------------

```
ember install ember-jsoneditor
```

## Usage

```handlebars
<JsonEditor @json={{this.model}} @mode={{this.mode}} @name={{this.name}} />
```

For Ember versions < 3.4, you need to use classic component invocation:

```handlebars
{{json-editor json=model mode=mode name=name}}
```

For a complete example, see the [dummy test app in `tests/dummy/app/`](https://github.com/Glavin001/ember-jsoneditor/tree/master/tests/dummy/app).

## Documentation

See [jsoneditor](https://github.com/josdejong/jsoneditor/blob/master/docs/api.md) for configuration details.  ember-jsoneditor supports the following jsoneditor options:


Option      | Description                                                                       | Default
------------|-----------------------------------------------------------------------------------|------------
change      | maps to jsoneditor's onChange event                                               | null
error       | maps to jsoneditor's onError event                                                | null
expand      | if true, renders with json tree expanded                                          | false
history     | Enables history undo/redo button                                                  | true
indentation | number of indentation spaces                                                      | 2
mode        | Editor mode - modes                                                               | tree
modes       | Drop down to select editor mode.  Options: 'tree', 'view', 'form', 'code', 'text' | All options
name        | Field name for the JSON root node,                                                | null
search      | boolean - show editor search box                                                  | true


Example for using event options

```handlebars
{{!-- app/templates/application.hbs --}}

<JsonEditor 
  @json={{this.model}} 
  @mode={{this.mode}} 
  @name={{this.name}} 
  @change={{action 'itChanged'}} 
  @error={{action 'myError'}} 
/>
```

```javascript
// app/controllers/application.js
import Controller from '@ember/controller';

export default Controller.extend({
   /// ....
   actions: {
    myError(error){
      alert(`Error: ${error}`)
    },

    itChanged() {
      alert("The Data Changed!");
    }
  }
})
```

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
