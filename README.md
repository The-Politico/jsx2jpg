![](https://www.politico.com/interactives/cdn/images/badge.svg)

# ⚛️ jsx2jpg 🖼️

A tool for taking screenshots of JSX component files.

## Quick Start

Install the library
```
$ npm install -g jsx2jpg
```

Use the library

```
$ jsx2jpg snap App.jsx
```

See [Examples](#examples) below for more.

## CLI Reference

### Snap

The `snap` command (currently the only command in this library takes a screenshot of a React component).

#### Show help message:

```
$ jsx2jpg snap --help
```

#### Calling format and available options:

```
jsx2jpg snap <component> [context]

Takes a screenshot of a component.

Positionals:
  component   A path to a JSX file.                          [string] [required]
  context, c  A path to an importable data file.                        [string]

Options:
  --version           Show version number                              [boolean]

  --help              Show help                                        [boolean]

  --size, -s          A sizing string for width/height
                                                   [string] [default: "600x325"]

  --destination, -o   The destination directory          [string] [default: pwd]

  --quality, -q       The quality (from 0 to 100)        [number] [default: 100]

  --resolution, -r    A resolution multiplier              [number] [default: 1]

  --fileAccessor, -a  Accessor for filename if multiple contexts
                                                        [string] [default: "id"]

  --filename, -n      Name of file if single context
                                                 [string] [default: "share.jpg"]

  --verbose, -v       Whether to log updates in the console
                                                       [boolean] [default: true]

  --cleanup, --cu     Whether to delete the .tmp directory
                                                       [boolean] [default: true]
```

## Examples
- [Hello World](docs/examples/HelloWorld.md)
- [Hello Options](docs/examples/HelloOptions.md)
- [Hello Styles](docs/examples/HelloStyles.md)
- [Hello Data](docs/examples/HelloData.md)
  - [Hello Programmatic Data](docs/examples/HelloData.md#generating-data-programmatically)
  - [Hello Asynchronous Data](docs/examples/HelloData.md#generating-data-asynchronously)
