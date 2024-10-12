/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Import Reactotron
import Reactotron from 'reactotron-react-native';

// Setup Reactotron only in development mode
if (__DEV__) {
    Reactotron
        .configure() // controls connection settings
        .useReactNative() // add all built-in react native plugins
        .connect(); // let's connect!

    // Use console.tron for logging
    console.tron = Reactotron;
}

AppRegistry.registerComponent(appName, () => App);
