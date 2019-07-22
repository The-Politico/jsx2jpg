# Hello Options

The main options you'll need to change when calling `jsx2jpg` are the `--size`, `--quality`, `--resolution`, `--filename`, and `--destination`.

## Size

`size` is a string that determines the size of the window when the screenshot is taken. It is measured in pixels, but the value you pass should be in the format of `WIDTHxHEIGHT` (without any units like `px` or `em`).

For example if you want your image to be 1080 pixels in width and 720 pixels in height, you would supply the following string as the `size`: `1080x720`.

## Quality

`quality` is the jpg quality of your destination file. It should be a number between 0 and 100. You can read more about [jpg compression here](http://learnmem.cshlp.org/site/misc/tsg_JPEG_instructions.pdf), but just know higher = better.

## Resolution

Sometimes you don't want to compress your image — you want to increase the `resolution` instead. Resolution is a scale factor that increases the _output size_ without needing to change the _source component's size_ (and without needing to modify the component's css).

For example, imagine two components that fit into a `100px` by `100px` square. If you call `jsx2jpg` with the `size` option set to `100x100`, the box fills the screen.

If you then decide you want a larger image, you may be inclined to call `jsx2jpg` again, this time with the `size` option set to `200x200`. But in this case, the square will now only take up a quarter of the screen.

If you could only modify the `size` option, you'd have to revise the code of your component (and likely have to change things in multiple places if you have complicated illustrations).

There's got to be a better way. And now, through science, there is! That's where resolution comes in.

By setting the resolution to 2, you can keep your code in a window `100px` on each side but make your output a higher resolution of `200px` (2 x `100px`) per side — all without needing to go into the code.

## Filename
When you're using `jsx2jpg` to create a single image, `filename` is the name of the file where it will be saved (see [Hello Data](./HelloData.md) for exporting multiple images). This option defaults to `share.jpg`, since we use this tool mostly for share images.

## Destination
`destination` is the base directory in which all images are saved. This defaults to your current working directory. Use the `pwd` command in your terminal window to know where that is.

## Putting it all together

Given the JSX file below and using all of these options together, you can give the destination file a custom size, quality, and destination path.

```javascript
// App.jsx
import React from 'react';

const HelloOptions = () => (
  <h1>Hello Options</h1>
);

export default HelloOptions;
```


```sh
$ jsx2jpg snap App.jsx --size="300x75" --quality=80 --resolution=2 --destination="images" --filename="hello-options.jpg"
```

Which produces this image at `./images/hello-options.jpg`:
![](../images/example-7.jpg)
