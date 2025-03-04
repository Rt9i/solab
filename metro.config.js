const {getDefaultConfig} = require('expo/metro-config');
const {mergeConfig} = require('@react-native/metro-config');

const config = {
  resolver: {
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
      'mjs',
    ],
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json', 'wasm', 'cjs','mjs'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
