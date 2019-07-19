import path from 'path';
import portfinder from 'portfinder';
import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import get from 'lodash/get';
import preview from '@politico/interactive-bin/dist/scripts/preview';
import { Logger } from './utils/console';

import parseSize from './utils/parseSize';

import { TMP } from './constants';

const takeScreenshot = async function(page, html, output, name) {
  await fs.outputFile(path.join(TMP, 'index.html'), html);
  await page.reload();
  await fs.ensureDir(output);
  await page.screenshot({ path: path.join(output, name) });
};

export default async function(html, context, { resolution, output, size, fileAccessor, filename, verbose }) {
  const logger = new Logger({ verbose });

  const { width, height } = parseSize(size);

  portfinder.basePort = 3456;
  const port = await portfinder.getPortPromise();
  const server = await preview({
    directory: TMP,
    port,
    openBrowser: false,
    verbose: false,
  });

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({
    width,
    height,
    deviceScaleFactor: parseInt(resolution),
  });
  await page.goto(`http://localhost:${port}/`);

  if (Array.isArray(html)) {
    logger.progress.start(html.length, 0);
    for (let [idx, file] of html.entries()) {
      logger.progress.increment(1);
      await takeScreenshot(page, file, output, get(context[idx], fileAccessor, filename));
    }
    logger.progress.stop();
  } else {
    await takeScreenshot(page, html, output, filename);
  }

  await server.close();
  await page.close();
  await browser.close();
}
