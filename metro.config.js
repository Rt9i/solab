const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

// Set the EXPO_ROUTER_APP_ROOT environment variable to point to your 'app' folder
process.env.EXPO_ROUTER_APP_ROOT = "app"; // Adjust this if your screens are not in 'app'

// Metro configuration
const config = {
  resolver: {
    assetExts: ['db', 'mp4', 'jpg', 'png', 'ttf', 'wav', 'obj', 'fbx', 'svg'], // Custom asset extensions
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json', 'wasm'], // Additional source file extensions
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
