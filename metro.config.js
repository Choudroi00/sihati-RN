const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");
const { withNativeWind } = require("nativewind/metro");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const mergedConfig = mergeConfig(defaultConfig, {}); // Merging with an empty object is redundant but keeps the structure clear

const windWrappedConfig = withNativeWind(mergedConfig, { input: "./global.css" });
const reanimatedWrappedConfig = wrapWithReanimatedMetroConfig(windWrappedConfig);

module.exports = reanimatedWrappedConfig;