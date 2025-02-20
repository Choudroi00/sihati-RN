const { getDefaultConfig } = require("@react-native/metro-config");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");
const { withNativeWind } = require("nativewind/metro");

const defaultConfig = getDefaultConfig(__dirname);

// Apply NativeWind first
const windWrappedConfig = withNativeWind(defaultConfig, { input: "./global.css" });

// Then apply Reanimated
const reanimatedWrappedConfig = wrapWithReanimatedMetroConfig(windWrappedConfig);

module.exports = reanimatedWrappedConfig;
