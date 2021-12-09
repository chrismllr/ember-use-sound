'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');

const config = configs.ember();

module.exports = {
  ...config,
  overrides: [...config.overrides],
  ignorePatterns: ['babel.config*', 'rollup.config*'],
};
