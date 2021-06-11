import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { App } from 'components/src/App';

import { name as appName } from './app.json';

console.log('Started from index.ts');

AppRegistry.registerComponent(appName, () => App);
