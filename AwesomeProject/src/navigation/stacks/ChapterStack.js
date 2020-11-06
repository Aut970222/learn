import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CardScreenOption from '../options/CardScreenOption';

import VideoChaptersScreen from '../../screens/video/ChaptersScreen';

const Stack = createStackNavigator();

// 章节 Stack
function ChapterStack() {
  return (
    <Stack.Navigator
      screenOptions={({route, navigation}) => ({
        ...CardScreenOption(route, navigation),
      })}>
      <Stack.Screen name="VideoChapters" component={VideoChaptersScreen} />
    </Stack.Navigator>
  );
}

export default ChapterStack;
