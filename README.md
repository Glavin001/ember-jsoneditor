# Ember JSON Editor [![npm version](https://badge.fury.io/js/ember-jsoneditor.svg)](http://badge.fury.io/js/ember-jsoneditor)

> Ember component for [JSON Editor](https://github.com/josdejong/jsoneditor/) to view, edit and format JSON.

**Live demo**: http://glavin001.github.io/ember-jsoneditor/

---

## Usage

```handlebars
{{json-editor json=model mode=mode name=name}}
```

For a complete example, see the [dummy test app in `tests/dummy/app/`](https://github.com/Glavin001/ember-jsoneditor/tree/master/tests/dummy/app).

## Documentation

See [jsoneditor](https://github.com/josdejong/jsoneditor/blob/master/docs/api.md) for configuration details.  ember-jsoneditor supports the following configuration options:

   ```
   mode, modes, onChange, search, history, name, indentation and onError
  ```

  Breaking Changes - prior versions of [jsoneditor](https://github.com/josdejong/jsoneditor) used `change` and `error` rather than `onChange` and `onError`



## Installation

* `git clone <repository-url>` this repository
* `cd my-addon`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
