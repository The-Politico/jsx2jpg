import loadData from './utils/loadData';
import { log } from './utils/console';

export default async function(contextOrPath) {
  let context = contextOrPath;
  if (typeof contextOrPath === 'string') {
    context = loadData(contextOrPath);
    if (!context) {
      log(`No data file found at "${contextOrPath}".`, 'error');
      process.exitCode = 1;
      return new Error();
    }
  }

  return context;
}
