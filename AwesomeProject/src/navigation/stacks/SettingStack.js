import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SettingHomeScreen from '../../screens/setting/HomeScreen';
import SettingDetailsScreen from '../../screens/setting/DetailsScreen';
import CardScreenOption from '../options/CardScreenOption';

const Stack = createStackNavigator();

// 设置 Stack
function SettingStack() {
  return (
    <Stack.Navigator
      screenOptions={({route, navigation}) => ({
        ...CardScreenOption(route, navigation),
      })}>
      <Stack.Screen name="SettingHome" component={SettingHomeScreen} />
      <Stack.Screen name="SettingDetails" component={SettingDetailsScreen} />
    </Stack.Navigator>
  );
}

export default SettingStack;
