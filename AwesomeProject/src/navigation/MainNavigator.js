import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import CardScreenOption from './options/CardScreenOption';
import SearchStack from './stacks/SearchStack';
import SettingStack from './stacks/SettingStack';
import ChapterStack from './stacks/ChapterStack';

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({route, navigation}) => ({
        ...CardScreenOption(route, navigation),
        headerShown: false,
      })}>
      <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
      <Stack.Screen name="Search" component={SearchStack} />
      <Stack.Screen name="Setting" component={SettingStack} />
      <Stack.Screen name="Chapter" component={ChapterStack} />
    </Stack.Navigator>
  );
}

export default MainNavigator;
