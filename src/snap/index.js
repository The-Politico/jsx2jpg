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
    destination: DEFAULTS.DESTINATION,
    quality: DEFAULTS.QUALITY,
    verbose: DEFAULTS.VERBOSE,
    cleanup: DEFAULTS.CLEANUP,
    filename: DEFAULTS.FILENAME,
    fileAccessor: DEFAULTS.FILE_ACCESSOR,
  };
  const config = assign({}, defaults, options);

  // Set up logger
  const logger = new Logger({ verbose: config.verbose });
  logger.stepper.init(6);
  logger.log(`🖼 Converting ${chalk.bold(path.basename(`${componentOrPath}`))} into a JPG.`);

  logger.stepper.step('📦 Compiling JSX bundle...');
  const bundle = await parseBundle(componentOrPath);
  if (!bundle.component) { return; }
  const { component, helmet, styles } = bundle;

  logger.stepper.step('📂 Loading context...');
  const context = await parseContext(contextOrPath);
  if (context instanceof Error) { return; }

  logger.stepper.step('🛠 Rendering component from bundle + context...');
  const assets = renderFunc({
    component,
    helmet,
    data: context,
    verbose: config.verbose,
  });

  logger.stepper.step('🖥 Rendering HTML from component...');
  const html = htmlFunc({ styles, assets, verbose: config.verbose });

  // Screenshot
  logger.stepper.step(`📸 Taking screenshot at ${chalk.bold(config.size)} at ${chalk.bold(config.quality + '%')} quality with a scale factor of ${chalk.bold(config.resolution + 'x')}...`);
  await screenshot(html, context, config);

  // Cleanup
  if (config.cleanup) {
    logger.stepper.step(`🗑️ Cleaning up...`);
    await sweepTmp(config);
  } else {
    logger.stepper.step(`🗑️ Bypassing clean up step...`);
  }

  logger.log(`Screenshot saved to ${chalk.bold(config.destination)}.`, 'success');
};

export default run;
