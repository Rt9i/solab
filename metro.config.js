const {getDefaultConfig} = require('expo/metro-config');
const {mergeConfig} = require('@react-native/metro-config');

process.env.EXPO_ROUTER_APP_ROOT = 'app';

const config = {
  resolver: {
    // Add any additional asset types you might need
    assetExts: [
      'db',
      'mp4',
      'jpg',
      'png',
      'ttf',
      'wav',
      'obj',
      'fbx',
      'svg',
      'gif',
      'json',
    ],
    // Add any additional source file types you might need
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json', 'wasm', 'cjs'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
