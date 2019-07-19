import { Logger } from './utils/console';

const render = (html, styles, helmet) => {
  return `
  <!DOCTYPE html>
  <html ${helmet.htmlAttributes || ''}>
    <head>
      ${helmet.title || ''}
      ${helmet.meta || ''}
      ${helmet.link || ''}
      ${helmet.script || ''}
      ${helmet.noscript || ''}
      ${helmet.style || ''}
      <style>html,body{margin: 0; width: 100%; height: 100%;}</style>
      <style>${styles || ''}</style>
    </head>
    <body ${helmet.bodyAttributes || ''}>
      ${html || ''}
    </body>
  </html>
  `;
};

export default ({ assets, styles, verbose }) => {
  const logger = new Logger({ verbose });

  if (Array.isArray(assets)) {
    const files = [];
    logger.progress.start(assets.length, 0);
    assets.forEach(d => {
      files.push(render(d.html, styles, d.helmet));
      logger.progress.increment(1);
    });
    logger.progress.stop();
    return files;
  } else if (typeof assets === 'object') {
    return render(assets.html, styles, assets.helmet);
  }
};
