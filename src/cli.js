import yargs from 'yargs';
import { snap } from './index';
import * as SNAP_DEFAULTS from 'Snap/defaults';

yargs // eslint-disable-line
  .scriptName('jsx2jpg')
  .command('snap <component> [context]', 'Takes a screenshot of a component.', (yargs) => {
    yargs
      .positional('component', {
        describe: 'A path to a JSX file.',
        type: 'string',
      })
      .positional('context', {
        alias: 'c',
        describe: 'A path to an importable data file.',
        type: 'string',
      })
      .option('size', {
        alias: 's',
        describe: 'A sizing string for width/height',
        default: SNAP_DEFAULTS.SIZE,
        type: 'string',
      })
      .option('destination', {
        alias: 'o',
        describe: 'The destination directory ',
        default: SNAP_DEFAULTS.DESTINATION,
        type: 'string',
      })
      .option('quality', {
        alias: 'q',
        describe: 'The quality (from 0 to 100)',
        default: SNAP_DEFAULTS.QUALITY,
        type: 'number',
      })
      .option('resolution', {
        alias: 'r',
        describe: 'A resolution multiplier',
        default: SNAP_DEFAULTS.RESOLUTION,
        type: 'number',
      })
      .option('fileAccessor', {
        alias: 'a',
        describe: 'Accessor for filename if multiple contexts',
        default: SNAP_DEFAULTS.FILE_ACCESSOR,
        type: 'string',
      })
      .option('filename', {
        alias: 'n',
        describe: 'Name of file if single context',
        default: SNAP_DEFAULTS.FILENAME,
        type: 'string',
      })
      .option('verbose', {
        alias: 'v',
        describe: 'Whether to log updates in the console',
        default: SNAP_DEFAULTS.VERBOSE,
        type: 'boolean',
      })
      .option('cleanup', {
        alias: 'cu',
        describe: 'Whether to delete the .tmp directory',
        default: SNAP_DEFAULTS.CLEANUP,
        type: 'boolean',
      });
  }, async function(argv) {
    await snap(argv.component, argv.context, argv);
  })
  .help()
  .argv;
