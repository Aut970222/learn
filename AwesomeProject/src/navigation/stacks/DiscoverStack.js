import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HeaderButtonsOption from '../options/HeaderButtonsOption';
import CardScreenOption from '../options/CardScreenOption';

import DiscoverHomeScreen from '../../screens/discover/HomeScreen';
import VideoCoursesScreen from '../../screens/video/CoursesScreen';

const Stack = createStackNavigator();

// 发现 Stack
function DiscoverStack() {
  return (
    <Stack.Navigator
      screenOptions={({route, navigation}) => ({
        ...CardScreenOption(route, navigation),
      })}>
      <Stack.Screen
        name="发现"
        component={DiscoverHomeScreen}
        options={({navigation}) => ({
          ...HeaderButtonsOption(navigation),
        })}
      />
      <Stack.Screen name="VideoCourses" component={VideoCoursesScreen} />
    </Stack.Navigator>
  );
}

export default DiscoverStack;
