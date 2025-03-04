const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

// Set the Expo Router app root directory
process.env.EXPO_ROUTER_APP_ROOT = 'app';

const config = {
  resolver: {
    assetExts: ['db', 'mp4', 'jpg', 'png', 'ttf', 'wav', 'obj', 'fbx', 'svg', 'gif', 'json'],
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json', 'wasm', 'cjs'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
