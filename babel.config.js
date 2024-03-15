const ENV = {
  DEVELOPMENT: 'development',
  TEST: 'test',
  PRODUCTION: 'production',
};

module.exports = function(api) {
  api.cache(true);

  var env = process.env.NODE_ENV;
  var presets = [
    '@babel/preset-env',
    ['@babel/preset-react', {
      'runtime': 'automatic',
    }],
    '@babel/preset-typescript',
  ];
  var plugins = [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-private-property-in-object',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-object-rest-spread',
    ['@babel/plugin-proposal-pipeline-operator', {
      'proposal': 'minimal',
    }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    ['babel-plugin-import-less', {
      library: 'lodash',
      module: '[little-camel]',
    }],
  ];

  switch (env) {
    case ENV.DEVELOPMENT:
      break;
    case ENV.TEST:
      break;
    case ENV.PRODUCTION:
      break;
  }

  return {
    presets,
    plugins,
  };
};