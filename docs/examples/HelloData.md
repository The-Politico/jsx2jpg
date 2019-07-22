# Hello Data

`jsx2jpg` lets you pass configuration context to your component via a data file. This context is injected into your component via React props (which you can use as you would any other props).

For example, given this data file:

```javascript
// data.json
{
  "name": "Andrew"
}
```

You can access its contents in your component through React's props:

```javascript
// App.jsx
import React from 'react';

const HelloData = (props) => (
  <h1>Hello {props.name}</h1>
);

export default HelloData;
```

You bind these two together through the CLI, where you specify the both the component's file and the context data file:

```sh
$ jsx2jpg snap App.jsx data.json --size="300x75"
```

That command produces the following image as `share.jpg`:

<img src="../images/example-2.jpg">

## Creating Multiple Images

Data files can also be an array, in which case `jsx2jpg` will create a new image for each one. When doing this you'll need to make sure each item in this array includes a key declaring the expected filename output for that array item. By default, `jsx2jpg` looks for this information in the `id` key, but you can customize it using the `--fileAccessor` prop in your CLI.

For example, if you have these files:

```javascript
// App.jsx
import React from 'react';

const HelloData = (props) => (
  <h1>Hello {props.name}</h1>
);

export default HelloData;
```

```javascript
// data.json
[
  {
    "name": "Allan",
    "output": "allan.jpg"
  },
  {
    "name": "Jon",
    "output": "jon.jpg"
  },
  {
    "name": "Beatrice",
    "output": "beatrice.jpg"
  }
]
```

And run this command:

```sh
$ jsx2jpg snap App.jsx data.json --size="300x75" --fileAccessor="output"
```

`jsx2jpg` will generate these images:

`allan.jpg`:

<img src="../images/example-3.jpg">

`beatrice.jpg`:

<img src="../images/example-4.jpg">

`jon.jpg`:

<img src="../images/example-5.jpg">

## Generating Data Programmatically

There may be cases where you want to generate the configuration context at runtime via JavaScript. You may want to process a local file, for example, or pass today's date into the React component.

In these cases, your can pass a JavaScript file as the context to your CLI. This JavaScript file should export an object or an array as the `module.exports`.

<em>Note: Unlike the JSX file that contains your React component, this JavaScript file will NOT be transpiled — so it must be written in a JavaScript version that's compatible with your node interpreter.</em>

To render a single image, you could have the following JavaScript file:

```javascript
// data.js
module.exports = {
  "name": "Andrew"
}
```

Which you would reference in this command to create an image:
```sh
$ jsx2jpg snap App.jsx data.js --size="300x75"
```

To render _multiple_ images, you could have the following JavaScript file:

```javascript
// data.js
module.exports = [
  {
    "name": "Allan",
    "output": "allan.jpg"
  },
  {
    "name": "Jon",
    "output": "jon.jpg"
  },
  {
    "name": "Beatrice",
    "output": "beatrice.jpg"
  }
]
```

Which you would reference in this command to create all three images:
```sh
$ jsx2jpg snap App.jsx data.js --size="300x75" --fileAccessor="output"
```

## Generating Data Asynchronously

Another common use case is performing an asynchronous task to produce your data, such as fetching a result from an API.

Like the examples in the last section, you would also do this via a JavaScript file that gets called at runtime. In this case you would set that file's `module.exports` equal to a function that returns a `promise`. That promise should resolve into either an object (if you're creating a single image) or an array of objects (if you're creating multiple images).

Given the example `App.jsx` from earlier examples and the following file which fetches user data from a [dummy API](https://jsonplaceholder.typicode.com/users/):

```javascript
// data.js
const https = require('https');

module.exports = () => new Promise((resolve, reject) => {
  https.get('https://jsonplaceholder.typicode.com/users/', resp => {
    resp.setEncoding('utf8');
    let body = '';

    resp.on('data', data => {
      body += data;
    });

    resp.on('end', () => {
      const data = JSON.parse(body);
      resolve(data.map(d => ({
        name: d.name,
        output: `${d.username}.jpg`,
      })));
    });
  });
});
```

_Note: This is meant to be an out-of-the-box example. You should probabaly be using a more sophicated libray to handle your fetching needs like [`node-fetch`](https://www.npmjs.com/package/node-fetch) or [`request`](https://www.npmjs.com/package/request)._


You can run the following command:
```sh
$ jsx2jpg snap App.jsx data.js --size="500x75" --fileAccessor="output"
```

Which will produce 10 images using the dummy user data.

One such example is (the dummy data has random usernames matched with real names):

`Bret.jpg`:

<img src="../images/example-6.jpg">
