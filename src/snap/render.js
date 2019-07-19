import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Logger } from './utils/console';

const render = (source, Helmet, data) => {
  const App = source;

  const app = (
    <App {...data} />
  );

  const html = ReactDOMServer.renderToStaticMarkup(app);
  const helmet = Helmet ? Helmet.renderStatic() : {};

  return {
    html,
    helmet,
  };
};

export default ({ component, helmet, data, verbose }) => {
  const logger = new Logger({ verbose });
  const log = logger.log;

  if (Array.isArray(data)) {
    const files = [];
    logger.progress.start(data.length, 0);
    data.forEach(d => {
      files.push(render(component, helmet, d));
      logger.progress.increment(1);
    });
    logger.progress.stop();
    return files;
  } else if (typeof data === 'object') {
    return render(component, helmet, data);
  } else {
    log('Invalid context type.', 'error');
    process.exitCode = 1;
  }
};
