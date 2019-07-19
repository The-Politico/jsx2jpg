'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
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

  _defineProperty(this, "stepper", {
    totalValue: 0,
    startValue: 0,
    currentValue: 0,
    init: function (totalValue) {
      var startValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.stepper.totalValue = totalValue;
      this.stepper.startValue = startValue;
      this.stepper.currentValue = 0;
    }.bind(this),
    step: function (message, type) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      this.stepper.currentValue = Math.floor(this.stepper.currentValue + 1);
      this.stepper.tabLevel = 0;
      this.log("[".concat(this.stepper.currentValue, "/").concat(this.stepper.totalValue, "] ").concat(message), type, prefix);
    }.bind(this),
    log: function (message, type) {
      this.log("".concat(message), type);
    }.bind(this)
  });

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
    var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    if (_this.verbose === false) {
      return;
    }

    var color = type === 'error' ? 'red' : type === 'success' ? 'green' : type === 'warning' ? 'yellow' : 'cyan';
    var logFunc = type === 'error' ? console.error : type === 'warning' ? console.warn : console.log;

    if (type) {
      logFunc("".concat(prefix).concat(chalk[color](type)), message);
    } else {
      logFunc("".concat(prefix).concat(message));
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
              _context.next = 25;
              break;
            }

            absComponentPath = path.join(cwd, componentOrPath);
            _context.prev = 8;
            _context.next = 11;
            return compile(absComponentPath, 'component', webpackConfig(), {
              mode: 'replace',
              module: 'replace',
              optimization: 'replace',
              stats: 'replace',
              plugins: 'replace'
            });

          case 11:
            bundle = _context.sent;
            eval(bundle.result.substring(4)); // eslint-disable-line no-eval

            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](8);
            console.error(chalk.red('error'), 'There was a problem compiling your JSX file:', componentOrPath);
            throw _context.t0;

          case 19:
            helmet = component && component.Helmt ? component.Helmet : null;
            component = component && component["default"] ? component["default"] : function () {
              return null;
            };
            styles = bundle && bundle.output.data['main.css'] ? bundle.output.data['main.css'].toString() : '';
            return _context.abrupt("return", {
              component: component,
              helmet: helmet,
              styles: styles
            });

          case 25:
            if (!(typeof componentOrPath === 'function')) {
              _context.next = 30;
              break;
            }

            component = componentOrPath;
            return _context.abrupt("return", {
              component: component,
              helmet: {},
              styles: ''
            });

          case 30:
            log('Invalid component provided.', 'error');
            process.exitCode = 1;
            return _context.abrupt("return", {
              component: null,
              helmet: null,
              styles: null
            });

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 15]]);
  }));
  return _ref.apply(this, arguments);
}

var loadData = /*#__PURE__*/
(function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(fp) {
    var data;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            data = require(path.join(process.cwd(), fp));
            _context.next = 7;
            break;

          case 4:
            _context.prev = 4;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", null);

          case 7:
            if (!(typeof data === 'function')) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", Promise.resolve(data()));

          case 11:
            return _context.abrupt("return", data);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 4]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();

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
              _context.next = 9;
              break;
            }

            _context.next = 4;
            return loadData(contextOrPath);

          case 4:
            context = _context.sent;

            if (context) {
              _context.next = 9;
              break;
            }

            log("No data file found at \"".concat(contextOrPath, "\"."), 'error');
            process.exitCode = 1;
            return _context.abrupt("return", new Error());

          case 9:
            return _context.abrupt("return", context);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref$1.apply(this, arguments);
}

var render = function render(html, styles, helmet) {
  return "\n  <!DOCTYPE html>\n  <html ".concat(helmet.htmlAttributes || '', ">\n    <head>\n      ").concat(helmet.title || '', "\n      ").concat(helmet.meta || '', "\n      ").concat(helmet.link || '', "\n      ").concat(helmet.script || '', "\n      ").concat(helmet.noscript || '', "\n      ").concat(helmet.style || '', "\n      <style>html,body{margin: 0; width: 100%; height: 100%;}</style>\n      <style>").concat(styles || '', "</style>\n    </head>\n    <body ").concat(helmet.bodyAttributes || '', ">\n      ").concat(html || '', "\n    </body>\n  </html>\n  ");
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
  var helmet = Helmet ? Helmet.renderStatic() : {};
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
  _regeneratorRuntime.mark(function _callee(page, html, destination, name, quality) {
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
            return fs__default.ensureDir(destination);

          case 6:
            _context.next = 8;
            return page.screenshot({
              type: 'jpeg',
              quality: quality,
              path: path.join(destination, name)
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function takeScreenshot(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

function screenshot (_x6, _x7, _x8) {
  return _ref3.apply(this, arguments);
}

function _ref3() {
  _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(html, context, _ref2) {
    var qualityStr, destination, size, fileAccessor, filename, verbose, resolution, logger, _parseSize, width, height, qualityInt, quality, port, server, browser, page, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, idx, file;

    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            qualityStr = _ref2.quality, destination = _ref2.destination, size = _ref2.size, fileAccessor = _ref2.fileAccessor, filename = _ref2.filename, verbose = _ref2.verbose, resolution = _ref2.resolution;
            logger = new Logger({
              verbose: verbose
            });
            _parseSize = parseSize(size), width = _parseSize.width, height = _parseSize.height;
            qualityInt = parseInt(qualityStr);
            quality = qualityInt > 100 ? 100 : qualityInt < 0 ? 0 : qualityInt;
            portfinder.basePort = 3456;
            _context2.next = 8;
            return portfinder.getPortPromise();

          case 8:
            port = _context2.sent;
            _context2.next = 11;
            return preview({
              directory: TMP,
              port: port,
              openBrowser: false,
              verbose: false
            });

          case 11:
            server = _context2.sent;
            _context2.next = 14;
            return puppeteer.launch({
              headless: true
            });

          case 14:
            browser = _context2.sent;
            _context2.next = 17;
            return browser.newPage();

          case 17:
            page = _context2.sent;
            _context2.next = 20;
            return page.setViewport({
              width: width,
              height: height,
              deviceScaleFactor: parseInt(resolution)
            });

          case 20:
            _context2.next = 22;
            return page["goto"]("http://localhost:".concat(port, "/"));

          case 22:
            if (!Array.isArray(html)) {
              _context2.next = 54;
              break;
            }

            logger.progress.start(html.length, 0);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 27;
            _iterator = html.entries()[Symbol.iterator]();

          case 29:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 37;
              break;
            }

            _step$value = _slicedToArray(_step.value, 2), idx = _step$value[0], file = _step$value[1];
            logger.progress.increment(1);
            _context2.next = 34;
            return takeScreenshot(page, file, destination, get(context[idx], fileAccessor, filename));

          case 34:
            _iteratorNormalCompletion = true;
            _context2.next = 29;
            break;

          case 37:
            _context2.next = 43;
            break;

          case 39:
            _context2.prev = 39;
            _context2.t0 = _context2["catch"](27);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 43:
            _context2.prev = 43;
            _context2.prev = 44;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 46:
            _context2.prev = 46;

            if (!_didIteratorError) {
              _context2.next = 49;
              break;
            }

            throw _iteratorError;

          case 49:
            return _context2.finish(46);

          case 50:
            return _context2.finish(43);

          case 51:
            logger.progress.stop();
            _context2.next = 56;
            break;

          case 54:
            _context2.next = 56;
            return takeScreenshot(page, html, destination, filename, quality);

          case 56:
            _context2.next = 58;
            return server.close();

          case 58:
            _context2.next = 60;
            return page.close();

          case 60:
            _context2.next = 62;
            return browser.close();

          case 62:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[27, 39, 43, 51], [44,, 46, 50]]);
  }));
  return _ref3.apply(this, arguments);
}

var sweepTmp = (function () {
  return fs.remove(TMP);
});

var SIZE = '600x325';
var QUALITY = 100;
var DESTINATION = "".concat(process.cwd());
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
              destination: DESTINATION,
              quality: QUALITY,
              verbose: VERBOSE,
              cleanup: CLEANUP,
              filename: FILENAME,
              fileAccessor: FILE_ACCESSOR
            };
            config = assign({}, defaults, options); // Set up logger

            logger = new Logger({
              verbose: config.verbose
            });
            logger.stepper.init(6);
            logger.log("\uD83D\uDDBC Converting ".concat(chalk.bold(path.basename("".concat(componentOrPath))), " into a JPG."));
            logger.stepper.step('📦 Compiling JSX bundle...');
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
            logger.stepper.step('📂 Loading context...');
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
            logger.stepper.step('🛠 Rendering component from bundle + context...');
            assets = renderFunc({
              component: component,
              helmet: helmet,
              data: context,
              verbose: config.verbose
            });
            logger.stepper.step('🖥 Rendering HTML from component...');
            html = htmlFunc({
              styles: styles,
              assets: assets,
              verbose: config.verbose
            }); // Screenshot

            logger.stepper.step("\uD83D\uDCF8 Taking screenshot at ".concat(chalk.bold(config.size), " at ").concat(chalk.bold(config.quality + '%'), " quality with a scale factor of ").concat(chalk.bold(config.resolution + 'x'), "..."));
            _context.next = 27;
            return screenshot(html, context, config);

          case 27:
            if (!config.cleanup) {
              _context.next = 33;
              break;
            }

            logger.stepper.step("\uD83D\uDDD1\uFE0F Cleaning up...");
            _context.next = 31;
            return sweepTmp();

          case 31:
            _context.next = 34;
            break;

          case 33:
            logger.stepper.step("\uD83D\uDDD1\uFE0F Bypassing clean up step...");

          case 34:
            logger.log("Screenshot saved to ".concat(chalk.bold(config.destination), "."), 'success');

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

exports.snap = run;
