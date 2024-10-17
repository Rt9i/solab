/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App'; // Ensure this path is correct
import { name as appName } from './app.json';

// Import Reactotron
import Reactotron from 'reactotron-react-native';

// Setup Reactotron only in development mode
if (__DEV__) {
    // using reactotron rather than the flipper
    Reactotron
        .configure() // controls connection settings
        .useReactNative() // add all built-in react native plugins
        .connect(); // let's connect!

    // Use console.tron for logging
    console.tron = Reactotron;
}

// Register the main application component
AppRegistry.registerComponent(appName, () => App);
