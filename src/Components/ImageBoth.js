// components/ImageBoth.js
import { Image as RnImage, Platform } from 'react-native';

let ImageBoth = RnImage;
if (Platform.OS !== 'web') {
  ImageBoth = require('expo-image').Image;
}

export default ImageBoth;
