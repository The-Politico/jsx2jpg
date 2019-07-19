import path from 'path';
import assign from 'lodash/assign';
import chalk from 'chalk';

import parseBundle from './parseBundle';
import parseContext from './parseContext';
import htmlFunc from './html';
import renderFunc from './render';
import screenshot from './screenshot';
import sweepTmp from './utils/sweepTmp';
import { Logger } from './utils/console';

import * as DEFAULTS from './defaults';

const run = async function(componentOrPath, contextOrPath = {}, options) {
  const defaults = {
    size: DEFAULTS.SIZE,
    output: DEFAULTS.OUTPUT,
    resolution: DEFAULTS.RESOLUTION,
    verbose: DEFAULTS.VERBOSE,
    cleanup: DEFAULTS.CLEANUP,
    filename: DEFAULTS.FILENAME,
    fileAccessor: DEFAULTS.FILE_ACCESSOR,
  };
  const config = assign({}, defaults, options);

  // Set up logger
  const logger = new Logger({ verbose: config.verbose });
  const log = logger.log;
  log(`🖼 Converting ${chalk.bold(path.basename(`${componentOrPath}`))} into a JPG.`);

  log('[1/6] 📦 Compiling JSX bundle...');
  const bundle = await parseBundle(componentOrPath);
  if (!bundle.component) { return; }
  const { component, helmet, styles } = bundle;

  log('[2/6] 📂 Loading context...');
  const context = await parseContext(contextOrPath);
  if (context instanceof Error) { return; }

  log('[3/6] 🛠 Rendering component from bundle + context...');
  const assets = renderFunc({
    component,
    helmet,
    data: context,
    verbose: config.verbose,
  });

  log('[4/6] 🖥 Rendering HTML from component...');
  const html = htmlFunc({ styles, assets, verbose: config.verbose });

  // Screenshot
  log(`[5/6] 📸 Taking screenshot at ${chalk.bold(config.size)} with a display factor of ${chalk.bold(config.resolution)}...`);
  await screenshot(html, context, config);

  // Cleanup
  if (config.cleanup) {
    log(`[6/6] 🧹 Cleaning up...`);
    await sweepTmp(config);
  } else {
    log(`[6/6] 🧹 Bypassing clean up step...`);
  }

  log(`Screenshot saved to ${chalk.bold(config.output)}.`, 'success');
};

export default run;
