const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');


process.env.EXPO_ROUTER_APP_ROOT = "app";

const config = {
  resolver: {
    assetExts: ['db', 'mp4', 'jpg', 'png', 'ttf', 'wav', 'obj', 'fbx', 'svg'],
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json', 'wasm'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
