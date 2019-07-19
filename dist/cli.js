#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var yargs = _interopDefault(require('yargs'));
var path = _interopDefault(require('path'));
var assign = _interopDefault(require('lodash/assign'));
var chalk = _interopDefault(require('chalk'));
var compile = _interopDefault(require('@politico/interactive-bin/dist/utils/_compile'));
var MiniCssExtractPlugin = _interopDefault(require('mini-css-extract-plugin'));
var webpackConfig$1 = _interopDefault(require('@politico/interactive-bin/dist/config/webpack.prod.js'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var cli = _interopDefault(require('cli-progress'));
var _typeof = _interopDefault(require('@babel/runtime/helpers/typeof'));
var React = _interopDefault(require('react'));
var ReactDOMServer = _interopDefault(require('react-dom/server'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
var portfinder = _interopDefault(require('portfinder'));
var puppeteer = _interopDefault(require('puppeteer'));
var fs = require('fs-extra');
var fs__default = _interopDefault(fs);
var get = _interopDefault(require('lodash/get'));
var preview = _interopDefault(require('@politico/interactive-bin/dist/scripts/preview'));

var webpackConfig = (function () {
  var config = assign({}, webpackConfig$1);
  config.plugins = [new MiniCssExtractPlugin({
    filename: "[name].css"
  })];
  delete config.entry;
  delete config.output;
  return config;
});

var Logger = function Logger() {
  var _this = this;

  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Logger);

  _defineProperty(this, "progress", {
    start: function (totalValue, startValue) {
      if (this.verbose === false) {
        return;
      }

      this.bar.start(totalValue, startValue);
    }.bind(this),
    update: function () {
      if (this.verbose === false) {
        return;
      }

      this.bar.update(arguments);
    }.bind(this),
    increment: function (amount) {
      if (this.verbose === false) {
        return;
      }

      this.bar.increment(amount);
    }.bind(this),
    stop: function () {
      if (this.verbose === false) {
        return;
      }

      this.bar.stop();
    }.bind(this)
  });

  _defineProperty(this, "log", function (message, type) {
    if (_this.verbose === false) {
      return;
    }

    var color = type === 'error' ? 'red' : type === 'success' ? 'green' : type === 'warning' ? 'yellow' : 'cyan';
    var logFunc = type === 'error' ? console.error : type === 'warning' ? console.warn : console.log;

    if (type) {
      logFunc(chalk[color](type), message);
    } else {
      logFunc(message);
    }
  });

  this.verbose = config.verbose;
  this.bar = new cli.Bar({
    clearOnComplete: true
  }, cli.Presets.shades_classic);
};

var defaultLogger = new Logger();
var log = defaultLogger.log;

var cwd = process.cwd();
function parseBundle (_x) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(componentOrPath) {
    var component, helmet, absComponentPath, bundle, styles;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (componentOrPath) {
              _context.next = 6;
              break;
            }

            log('No component defined.', 'error');
            process.exitCode = 1;
            return _context.abrupt("return", {
              component: null,
              helmet: null,
              styles: null
            });

          case 6:
            if (!(typeof componentOrPath === 'string')) {
              _context.next = 18;
              break;
            }

            absComponentPath = path.join(cwd, componentOrPath);
            _context.next = 10;
            return compile(absComponentPath, 'component', webpackConfig(), {
              mode: 'replace',
              module: 'replace',
              optimization: 'replace',
              stats: 'replace',
              plugins: 'replace'
            });

          case 10:
            bundle = _context.sent;
            eval(bundle.result.substring(4)); // eslint-disable-line no-eval

            helmet = component.Helmet;
            component = component["default"];
            styles = bundle.output.data['main.css'].toString();
            return _context.abrupt("return", {
              component: component,
              helmet: helmet,
              styles: styles
            });

          case 18:
            if (!(typeof componentOrPath === 'function')) {
              _context.next = 23;
              break;
            }

            component = componentOrPath;
            return _context.abrupt("return", {
              component: component,
              helmet: {},
              styles: ''
            });

          case 23:
            log('Invalid component provided.', 'error');
            process.exitCode = 1;
            return _context.abrupt("return", {
              component: null,
              helmet: null,
              styles: null
            });

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}

var loadData = (function (fp) {
  var data;

  try {
    data = require(path.join(process.cwd(), fp));
  } catch (e) {
    return null;
  }

  if (typeof data === 'function') {
    return Promise.resolve(data());
  } else {
    return data;
  }
});

function parseContext (_x) {
  return _ref$1.apply(this, arguments);
}

function _ref$1() {
  _ref$1 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(contextOrPath) {
    var context;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            context = contextOrPath;

            if (!(typeof contextOrPath === 'string')) {
              _context.next = 7;
              break;
            }

            context = loadData(contextOrPath);

            if (context) {
              _context.next = 7;
              break;
            }

            log("No data file found at \"".concat(contextOrPath, "\"."), 'error');
            process.exitCode = 1;
            return _context.abrupt("return", new Error());

          case 7:
            return _context.abrupt("return", context);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref$1.apply(this, arguments);
}

var render = function render(html, styles, helmet) {
  return "\n  <!DOCTYPE html>\n  <html ".concat(helmet.htmlAttributes, ">\n    <head>\n      ").concat(helmet.title, "\n      ").concat(helmet.meta, "\n      ").concat(helmet.link, "\n      ").concat(helmet.script, "\n      ").concat(helmet.noscript, "\n      ").concat(helmet.style, "\n      <style>html,body{margin: 0; width: 100%; height: 100%;}</style>\n      <style>").concat(styles, "</style>\n    </head>\n    <body ").concat(helmet.bodyAttributes, ">\n      ").concat(html, "\n    </body>\n  </html>\n  ");
};

var htmlFunc = (function (_ref) {
  var assets = _ref.assets,
      styles = _ref.styles,
      verbose = _ref.verbose;
  var logger = new Logger({
    verbose: verbose
  });

  if (Array.isArray(assets)) {
    var files = [];
    logger.progress.start(assets.length, 0);
    assets.forEach(function (d) {
      files.push(render(d.html, styles, d.helmet));
      logger.progress.increment(1);
    });
    logger.progress.stop();
    return files;
  } else if (_typeof(assets) === 'object') {
    return render(assets.html, styles, assets.helmet);
  }
});

var render$1 = function render(source, Helmet, data) {
  var App = source;
  var app = React.createElement(App, data);
  var html = ReactDOMServer.renderToStaticMarkup(app);
  var helmet = Helmet.renderStatic();
  return {
    html: html,
    helmet: helmet
  };
};

var renderFunc = (function (_ref) {
  var component = _ref.component,
      helmet = _ref.helmet,
      data = _ref.data,
      verbose = _ref.verbose;
  var logger = new Logger({
    verbose: verbose
  });
  var log = logger.log;

  if (Array.isArray(data)) {
    var files = [];
    logger.progress.start(data.length, 0);
    data.forEach(function (d) {
      files.push(render$1(component, helmet, d));
      logger.progress.increment(1);
    });
    logger.progress.stop();
    return files;
  } else if (_typeof(data) === 'object') {
    return render$1(component, helmet, data);
  } else {
    log('Invalid context type.', 'error');
    process.exitCode = 1;
  }
});

var parseSize = (function (size) {
  var width, height;
  width = parseInt(size.split('x')[0]);
  height = parseInt(size.split('x')[1]);
  return {
    width: width,
    height: height
  };
});

var TMP = path.join(process.cwd(), '.tmp');

var takeScreenshot =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(page, html, output, name) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fs__default.outputFile(path.join(TMP, 'index.html'), html);

          case 2:
            _context.next = 4;
            return page.reload();

          case 4:
            _context.next = 6;
            return fs__default.ensureDir(output);

          case 6:
            _context.next = 8;
            return page.screenshot({
              path: path.join(output, name)
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function takeScreenshot(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

function screenshot (_x5, _x6, _x7) {
  return _ref3.apply(this, arguments);
}

function _ref3() {
  _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(html, context, _ref2) {
    var resolution, output, size, fileAccessor, filename, verbose, logger, _parseSize, width, height, port, server, browser, page, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, idx, file;

    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            resolution = _ref2.resolution, output = _ref2.output, size = _ref2.size, fileAccessor = _ref2.fileAccessor, filename = _ref2.filename, verbose = _ref2.verbose;
            logger = new Logger({
              verbose: verbose
            });
            _parseSize = parseSize(size), width = _parseSize.width, height = _parseSize.height;
            portfinder.basePort = 3456;
            _context2.next = 6;
            return portfinder.getPortPromise();

          case 6:
            port = _context2.sent;
            _context2.next = 9;
            return preview({
              directory: TMP,
              port: port,
              openBrowser: false,
              verbose: false
            });

          case 9:
            server = _context2.sent;
            _context2.next = 12;
            return puppeteer.launch({
              headless: true
            });

          case 12:
            browser = _context2.sent;
            _context2.next = 15;
            return browser.newPage();

          case 15:
            page = _context2.sent;
            _context2.next = 18;
            return page.setViewport({
              width: width,
              height: height,
              deviceScaleFactor: parseInt(resolution)
            });

          case 18:
            _context2.next = 20;
            return page["goto"]("http://localhost:".concat(port, "/"));

          case 20:
            if (!Array.isArray(html)) {
              _context2.next = 52;
              break;
            }

            logger.progress.start(html.length, 0);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 25;
            _iterator = html.entries()[Symbol.iterator]();

          case 27:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 35;
              break;
            }

            _step$value = _slicedToArray(_step.value, 2), idx = _step$value[0], file = _step$value[1];
            logger.progress.increment(1);
            _context2.next = 32;
            return takeScreenshot(page, file, output, get(context[idx], fileAccessor, filename));

          case 32:
            _iteratorNormalCompletion = true;
            _context2.next = 27;
            break;

          case 35:
            _context2.next = 41;
            break;

          case 37:
            _context2.prev = 37;
            _context2.t0 = _context2["catch"](25);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 41:
            _context2.prev = 41;
            _context2.prev = 42;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 44:
            _context2.prev = 44;

            if (!_didIteratorError) {
              _context2.next = 47;
              break;
            }

            throw _iteratorError;

          case 47:
            return _context2.finish(44);

          case 48:
            return _context2.finish(41);

          case 49:
            logger.progress.stop();
            _context2.next = 54;
            break;

          case 52:
            _context2.next = 54;
            return takeScreenshot(page, html, output, filename);

          case 54:
            _context2.next = 56;
            return server.close();

          case 56:
            _context2.next = 58;
            return page.close();

          case 58:
            _context2.next = 60;
            return browser.close();

          case 60:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[25, 37, 41, 49], [42,, 44, 48]]);
  }));
  return _ref3.apply(this, arguments);
}

var sweepTmp = (function () {
  return fs.remove(TMP);
});

var SIZE = '600x325';
var RESOLUTION = '10';
var OUTPUT = "".concat(process.cwd());
var VERBOSE = true;
var CLEANUP = true;
var FILE_ACCESSOR = 'id';
var FILENAME = 'share.jpg';

var run =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(componentOrPath) {
    var contextOrPath,
        options,
        defaults,
        config,
        logger,
        log,
        bundle,
        component,
        helmet,
        styles,
        context,
        assets,
        html,
        _args = arguments;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            contextOrPath = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            options = _args.length > 2 ? _args[2] : undefined;
            defaults = {
              size: SIZE,
              output: OUTPUT,
              resolution: RESOLUTION,
              verbose: VERBOSE,
              cleanup: CLEANUP,
              filename: FILENAME,
              fileAccessor: FILE_ACCESSOR
            };
            config = assign({}, defaults, options); // Set up logger

            logger = new Logger({
              verbose: config.verbose
            });
            log = logger.log;
            log("\uD83D\uDDBC Converting ".concat(chalk.bold(path.basename("".concat(componentOrPath))), " into a JPG."));
            log('[1/6] 📦 Compiling JSX bundle...');
            _context.next = 10;
            return parseBundle(componentOrPath);

          case 10:
            bundle = _context.sent;

            if (bundle.component) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return");

          case 13:
            component = bundle.component, helmet = bundle.helmet, styles = bundle.styles;
            log('[2/6] 📂 Loading context...');
            _context.next = 17;
            return parseContext(contextOrPath);

          case 17:
            context = _context.sent;

            if (!(context instanceof Error)) {
              _context.next = 20;
              break;
            }

            return _context.abrupt("return");

          case 20:
            log('[3/6] 🛠 Rendering component from bundle + context...');
            assets = renderFunc({
              component: component,
              helmet: helmet,
              data: context,
              verbose: config.verbose
            });
            log('[4/6] 🖥 Rendering HTML from component...');
            html = htmlFunc({
              styles: styles,
              assets: assets,
              verbose: config.verbose
            }); // Screenshot

            log("[5/6] \uD83D\uDCF8 Taking screenshot at ".concat(chalk.bold(config.size), " with a display factor of ").concat(chalk.bold(config.resolution), "..."));
            _context.next = 27;
            return screenshot(html, context, config);

          case 27:
            if (!config.cleanup) {
              _context.next = 33;
              break;
            }

            log("[6/6] \uD83E\uDDF9 Cleaning up...");
            _context.next = 31;
            return sweepTmp();

          case 31:
            _context.next = 34;
            break;

          case 33:
            log("[6/6] \uD83E\uDDF9 Bypassing clean up step...");

          case 34:
            log("Screenshot saved to ".concat(chalk.bold(config.output), "."), 'success');

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function run(_x) {
    return _ref.apply(this, arguments);
  };
}();

yargs // eslint-disable-line
.scriptName('jsx2jpg').command('snap <component> [context]', 'Takes a screenshot of a component.', function (yargs) {
  yargs.positional('component', {
    describe: 'A path to a JSX file.',
    type: 'string'
  }).positional('context', {
    alias: 'c',
    describe: 'A path to an importable data file.',
    type: 'string'
  }).option('size', {
    alias: 's',
    describe: 'A sizing string for width/height',
    "default": SIZE,
    type: 'string'
  }).option('output', {
    alias: 'o',
    describe: 'Accessor for Google display name',
    "default": OUTPUT,
    type: 'string'
  }).option('resolution', {
    alias: 'r',
    describe: 'The resolution factor (higher = better quality)',
    "default": RESOLUTION,
    type: 'number'
  }).option('fileAccessor', {
    alias: 'a',
    describe: 'Accessor for filename if multiple contexts',
    "default": FILE_ACCESSOR,
    type: 'string'
  }).option('filename', {
    alias: 'n',
    describe: 'Name of file if single context',
    "default": FILENAME,
    type: 'string'
  }).option('verbose', {
    alias: 'v',
    describe: 'Whether to log updates in the console',
    "default": VERBOSE,
    type: 'boolean'
  }).option('cleanup', {
    alias: 'cu',
    describe: 'Whether to delete the .tmp directory',
    "default": CLEANUP,
    type: 'boolean'
  });
},
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(argv) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return run(argv.component, argv.context, argv);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()).help().argv;
