/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import {name as appName} from './app.json';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

AppRegistry.registerComponent(appName, () => RootNavigator);
SimpleLineIcons.loadFont();
Ionicons.loadFont();
EvilIcons.loadFont();
MaterialIcons.loadFont();
