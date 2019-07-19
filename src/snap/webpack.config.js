import assign from 'lodash/assign';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpackConfig from '@politico/interactive-bin/dist/config/webpack.prod.js';

export default () => {
  const config = assign({}, webpackConfig);
  config.plugins = [
    new MiniCssExtractPlugin({
      filename: `[name].css`,
    }),
  ];

  delete config.entry;
  delete config.output;

  return config;
};
