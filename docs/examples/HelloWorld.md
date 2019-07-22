# Hello World

Create a JSX component, which is the default export in its `.jsx` file:

```javascript
// App.jsx
import React from 'react';

const HelloWorld = () => (
  <h1>Hello World</h1>
);

export default HelloWorld;
```

Then, use the CLI on that file:
```sh
$ jsx2jpg snap App.jsx
```

That command will produce the following image:

<img align="left" src="../images/example-1.jpg">
