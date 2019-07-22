# Hello Styles

A major limitation with React component's on their own is being able to define page's `<head />`, especially for loading fonts. `jsx2jpg` uses [`react-helmet`](https://github.com/nfl/react-helmet) to solve this.

In your `App.jsx` component, you can include a `<head>` tag and fill it with any links, scripts, or meta tags you'll need. Then export your `Helmet` with your app like this:  

```javascript
export { Helmet } from 'react-helmet';
```

_Note: You should NOT use this for local styles you're writing yourself. See [Hello Styles](./HelloStyles.md) for more on connecting style sheets._


For example, to use the Google Font `Muli`, you can include the font's `link` statement in your head, and then apply the fontFamily to your component (this works for inline styles or external stylesheets).

```javascript
import React from 'react';

const HelloHead = (props) => (
  <div>
    <head> {/* <-- Open a <head> tag */}
      <link href='https://fonts.googleapis.com/css?family=Muli&display=swap' rel='stylesheet' />
      {/* ^ Load the <link> tag ^ */}
    </head> {/* <-- Close the </head> tag */}

    <h1 style={{ fontFamily: 'Muli' }}>{/* <-- Use the font */}
      Hello Andrew
    </h1>
  </div>
);

export default HelloHead;

export { Helmet } from 'react-helmet'; // <-- Export the Helmet
```

You can then use the CLI on that file:
```sh
$ jsx2jpg snap App.jsx
```

Which will produce the following image:

![](../images/example-9.jpg)
