# Hello Styles

You'll likely need more than just markup on your page if you're going to be taking a screenshot. For that, you can use [CSS modules](https://css-tricks.com/css-modules-part-1-need/). There's a lot you can do with managing your styles this way, but this example is just going to keep it simple.

Create a file called `styles.scss` in your root and fill it with this:

```scss
.styles :global {
  // SCSS GOES HERE
}
```

Then fill that `.styles` rule with any CSS you want on the page. For this example, just make the text red:
```scss
// styles.scss
.styles :global {
  h1 {
    color: red;
  }
}
```

In your App.jsx, import the `.styles` rule from the `styles.scss` file, and connect it to a container `<div>`:

```javascript
// App.jsx
import React from 'react';

import { styles } from './styles.scss';

const HelloStyles = () => (
  <div className={styles}>
    <h1>Hello Styles</h1>
  </div>
);

export default HelloStyles;
```

_Note: Importing styles this way creates a hash and saves it to the variable `styles`. It can then be passed to the `className` prop in your JSX like any other class._

You can then use the CLI on that file:
```sh
$ jsx2jpg snap App.jsx
```

Which will produce the following image:

![](../images/example-8.jpg)
