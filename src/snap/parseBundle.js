import path from 'path';
import compile from '@politico/interactive-bin/dist/utils/_compile';
import webpackConfig from './webpack.config.js';
import { log } from './utils/console';

const cwd = process.cwd();

export default async function(componentOrPath) {
  let component;
  let helmet;
  if (!componentOrPath) {
    log('No component defined.', 'error');
    process.exitCode = 1;
    return { component: null, helmet: null, styles: null };
  } else if (typeof componentOrPath === 'string') {
    const absComponentPath = path.join(cwd, componentOrPath);
    const bundle = await compile(absComponentPath, 'component', webpackConfig(), {
      mode: 'replace',
      module: 'replace',
      optimization: 'replace',
      stats: 'replace',
      plugins: 'replace',
    });
    eval(bundle.result.substring(4)); // eslint-disable-line no-eval

    helmet = component.Helmet;
    component = component.default;
    const styles = bundle.output.data['main.css'].toString();
    return { component, helmet, styles };
  } else if (typeof componentOrPath === 'function') {
    component = componentOrPath;
    return { component, helmet: {}, styles: '' };
  } else {
    log('Invalid component provided.', 'error');
    process.exitCode = 1;
    return { component: null, helmet: null, styles: null };
  }
}
