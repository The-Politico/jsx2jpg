# Hello World

Export a JSX component as the default in a `.jsx` file:

```javascript
// App.jsx
import React from 'react';

const HelloWorld = () => (
  <h1>Hello World</h1>
);

export default HelloWorld;
```

And use the CLI on that file:
```
$ jsx2jpg snap App.jsx
```

Which produces this image:

![](../images/example-1.jpg)
