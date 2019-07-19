# Hello Options

The main options you'll be changing are the `--size`, `--quality`, `--resolution`, `--filename`, and `--destination`.

## Size

`size` is a string that determines the size of the window when the screenshot is taken. It should be in the format of `WIDTHxHEIGHT` (without any units like `px` or `em`).

For example if you want your image to be 1080 pixels in width and 720 pixels in height, you would supply the following string as the `size`: `1080x720`.

## Quality

`quality` is the jpg quality of your destination file. It should be a number between 0 and 100. You can read more about [jpg compression here](http://learnmem.cshlp.org/site/misc/tsg_JPEG_instructions.pdf), but just know higher = better.

## Resolution

Sometimes you don't want to compress you image, you want to increase the `resolution`. Resolution is a scale factor that increases the output without needing to change the css in the component.

For example, imagine two components with a square set to `100px` in height and width. If you take a screenshot with the `size` at `100x100`, the box fills the screen. If you take a screenshot with the size `200x200`, the square will only take up a quarter the screen. But maybe you want your output to be `200px` without going into the code (and likely having to change things in multiple places for complicated illustrations). That's where resolution comes in. By setting the resolution to 2, you can keep your code at `100px` but make your output a higher resolution of `200px`.

## Filename
`filename` is the name of the file when you're only exporting a single image (see [Hello Data](./HelloData.md) for exporting multiple images). It defaults to `share.jpg` since we use this tool mostly for share images.

## Destination
`destination` is the base directory in which all images are saved. This defaults to your current working directory. Use the `pwd` command in the terminal to know what that is.

Given the JSX file below and using all of these options together you can give the destination file a custom size, quality, and destination path.

```javascript
// App.jsx
import React from 'react';

const HelloOptions = () => (
  <h1>Hello Options</h1>
);

export default HelloOptions;
```


```
$ jsx2jpg snap App.jsx --size="300x75" --quality=80 --resolution=2 --destination="images" --filename="hello-options.jpg"
```

Which produces this image at `./images/hello-options.jpg`:
![](../images/example-7.jpg)
