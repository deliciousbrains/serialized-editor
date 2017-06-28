[![Build Status](https://travis-ci.org/deliciousbrains/serialized-editor.svg?branch=master)](https://travis-ci.org/deliciousbrains/serialized-editor)

# Serialized Editor

A Vue.js component for editing data that has been [serialized in PHP](http://php.net/manual/en/function.serialize.php).

## Requirements

* [Vue.js](https://vuejs.org/) 2.x

## Install

```bash
npm install @deliciousbrains/serialized-editor
// or
yarn add @deliciousbrains/serialized-editor
```

## Usage

The package comes in two parts

1. A `SerializedParser` class to convert a PHP serialized string into JSON
1. A `SerializedEditor` vue.js component

First you need to import the components: 

```javascript
import { SerializedParser, SerializedEditor } from '@deliciousbrains/serialized-editor';
```

Next you need to convert the serialized data into JSON:

```javascript
computed: {
    parsedData() {
        var sp = new SerializedParser(serializedString);

        try {
            var json = sp.parse();
            return JSON.parse(json);
        } catch (e) {
            console.error(e);
        }

        return {};
    }
}
```

Then you can pass the `json-data` into the component:

```html
<serialized-editor :json-data="parsedData" @output="updateOutput"></serialized-editor>
```

## API

### Props

| Name | Type | Description |
| --- | --- | --- |
| `json-data` | Object | The JSON data returned from the `SerializedParser` class |

### Events

| Name | Description |
| --- | --- |
| `output` | Triggered when any data changes. Returns the new value in the PHP serialized format. |

## Credits

Serialized Editor was created by [Gilbert Pellegrom](https://twitter.com/gilbitron) from
[Delicious Brains](https://deliciousbrains.com/). Released under the MIT license.