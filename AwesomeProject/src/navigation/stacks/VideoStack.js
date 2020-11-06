import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HeaderButtonsOption from '../options/HeaderButtonsOption';
import CardScreenOption from '../options/CardScreenOption';

import VideoHomeScreen from '../../screens/video/HomeScreen';
import VideoCoursesScreen from '../../screens/video/CoursesScreen';

const Stack = createStackNavigator();

// 视频 Stack
function VideoStack() {
  return (
    <Stack.Navigator
      screenOptions={({route, navigation}) => ({
        ...CardScreenOption(route, navigation),
      })}>
      <Stack.Screen
        name="视频"
        component={VideoHomeScreen}
        options={({navigation}) => ({
          ...HeaderButtonsOption(navigation),
        })}
      />
      <Stack.Screen name="VideoCourses" component={VideoCoursesScreen} />
    </Stack.Navigator>
  );
}

export default VideoStack;
