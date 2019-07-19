# Hello Data

Access the props of your React component:

```javascript
// App.jsx
import React from 'react';

const HelloData = (props) => (
  <h1>Hello {props.name}</h1>
);

export default HelloData;
```

Create a data file:
```javascript
// data.json
{
  "name": "Andrew"
}
```

And use the CLI on that file, passing the right context:
```
$ jsx2jpg snap App.jsx data.json --size="300x75"
```

Which produces this image as `share.jpg`:
![](../images/example-2.jpg)

## Creating Multiple Images

Your data file can also return an array, and `jsx2jpg` will create a new image for each one. If you're doing this you'll need to make sure there's a key in your data objects that has the expected filename output. This key is `id` by default but you can customize it using the `--fileAccessor` prop in your CLI.

These files:

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

And then running this command:

```
$ jsx2jpg snap App.jsx data.json --size="300x75" --fileAccessor="output"
```

Will generate these images:

`allan.jpg`:
![](../images/example-3.jpg)

`jon.jpg`:
![](../images/example-4.jpg)

`beatrice.jpg`:
![](../images/example-5.jpg)

## Generating Data Programmatically

There may be cases where you want to generate the data asynchronously. You may want to process a local file or use today's date. In these cases, your can pass a JavaScript file as the context to your CLI. This JavaScript file should export an object or an array as the `module.exports`.

<em>Note: Unlike the JSX code, this code will NOT be transpiled and must be written in a version compatible with your node interpreter.</em>

Some examples include:
```javascript
// data.js
module.exports = {
  "name": "Andrew"
}
```

and

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

Which can be run with:
```
$ jsx2jpg snap App.jsx data.js --size="300x75" --fileAccessor="output"
```

## Generating Data Asynchronously
Another common use case is preforming an asynchronous task to produce your data such as fetching an API. You can do this by passing setting your `module.exports` to a function that returns a promise. That promise should resolve into either an object (if you're taking a single screenshot) or an array of objects (if you're taking multiple).

Given the `App.jsx` above and the following file which fetches user data from a [dummy API](https://jsonplaceholder.typicode.com/users/):
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
<em>Note: This is meant to be an out-of-the-box example. You should probabaly be using a more sophicated libray to handle your fetching needs like [`node-fetch`](https://www.npmjs.com/package/node-fetch) or [`request`](https://www.npmjs.com/package/request).</em>


You can run the following command:
```
$ jsx2jpg snap App.jsx data.js --size="500x75" --fileAccessor="output"
```

Which will produce 10 images using the dummy user data. One such example is (the dummy data has random usernames matched with real names):

`Bret.jpg`:
![](../images/example-6.jpg)