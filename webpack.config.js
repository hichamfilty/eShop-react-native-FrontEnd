const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const { getExpoBabelLoader } = require('@expo/webpack-config/utils');

const modulesToTranspile = [
  'ansi-regex',
  'ansi-styles',
  'chalk',
  '@rneui/base',
  '@rneui/themed',
  'react-dev-utils',
  '@react-navigation',
  'styled-components',
  'native-base',
  'node_modules',
];

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async function (env, argv) {
  env.babel = { dangerouslyAddModulePathsToTranspile: modulesToTranspile };

  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  const loader = getExpoBabelLoader(config);
  if (loader) {
    loader.include('@babel/plugin-proposal-class-properties');
    loader.include('@babel/plugin-transform-arrow-functions');
    loader.include('@babel/plugin-transform-block-scoping');
    loader.include('@babel/plugin-transform-sticky-regex');
    loader.include('@babel/plugin-transform-unicode-regex');
    loader.include('@babel/plugin-transform-dotall-regex');
    loader.include('@babel/plugin-transform-named-capturing-groups-regex');
    loader.include('@babel/plugin-transform-runtime');

    // console.warn(loader)
  }
  // const config = await createExpoWebpackConfigAsync(
  //   {
  //     ...env,
  //     babel: {
  //       dangerouslyAddModulePathsToTranspile: ['@rneui/base', '@rneui/themed'],
  //     },
  //   },
  //   argv
  // );
  // Finally return the new config for the CLI to use.
  return config;
};
