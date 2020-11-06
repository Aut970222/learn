import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabScreenOption from './options/TabScreenOption';
import Colors from '../constants/Colors';

import DiscoverStack from './stacks/DiscoverStack';
import VideoStack from './stacks/VideoStack';
import UserStack from './stacks/UserStack';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({...TabScreenOption(route)})}
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: 'gray',
        // 安卓高度bug
        style: {
          height: 50,
          paddingBottom: 0,
        },
      }}>
      <Tab.Screen name="Discover" component={DiscoverStack} />
      <Tab.Screen name="Video" component={VideoStack} />
      <Tab.Screen name="User" component={UserStack} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
