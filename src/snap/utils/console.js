import chalk from 'chalk';
import cli from 'cli-progress';

class Logger {
  constructor(config = {}) {
    this.verbose = config.verbose;
    this.bar = new cli.Bar({ clearOnComplete: true }, cli.Presets.shades_classic);
  }

  stepper = {
    totalValue: 0,
    startValue: 0,
    currentValue: 0,

    init: function(totalValue, startValue = 0) {
      this.stepper.totalValue = totalValue;
      this.stepper.startValue = startValue;
      this.stepper.currentValue = 0;
    }.bind(this),

    step: function(message, type, prefix = '') {
      this.stepper.currentValue = Math.floor(this.stepper.currentValue + 1);
      this.stepper.tabLevel = 0;
      this.log(`[${this.stepper.currentValue}/${this.stepper.totalValue}] ${message}`, type, prefix);
    }.bind(this),

    log: function(message, type) {
      this.log(`${message}`, type);
    }.bind(this),
  }

  progress = {
    start: function(totalValue, startValue) {
      if (this.verbose === false) {
        return;
      }
      this.bar.start(totalValue, startValue);
    }.bind(this),

    update: function() {
      if (this.verbose === false) {
        return;
      }
      this.bar.update(arguments);
    }.bind(this),

    increment: function(amount) {
      if (this.verbose === false) {
        return;
      }
      this.bar.increment(amount);
    }.bind(this),

    stop: function() {
      if (this.verbose === false) {
        return;
      }
      this.bar.stop();
    }.bind(this),
  }

  log = (message, type, prefix = '') => {
    if (this.verbose === false) {
      return;
    }

    const color = type === 'error' ? 'red' :
      type === 'success' ? 'green' :
        type === 'warning' ? 'yellow' : 'cyan';

    const logFunc = type === 'error' ? console.error :
      type === 'warning' ? console.warn : console.log;

    if (type) {
      logFunc(`${prefix}${chalk[color](type)}`, message);
    } else {
      logFunc(`${prefix}${message}`);
    }
  };
}

const defaultLogger = new Logger();
const log = defaultLogger.log;

export {
  Logger,
  defaultLogger,
  log
};
