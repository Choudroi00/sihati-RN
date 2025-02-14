const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const {wrapWithReanimatedMetroConfig} = require('react-native-reanimated/metro-config');
const { withNativeWind } = require("nativewind/metro");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

const mergedDefault = mergeConfig(getDefaultConfig(__dirname), config);

const windWrappedConf = withNativeWind(mergedDefault, { input: "./global.css" });

module.exports = mergeConfig(wrapWithReanimatedMetroConfig(config), windWrappedConf);