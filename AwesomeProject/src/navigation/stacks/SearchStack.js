import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CardScreenOption from '../options/CardScreenOption'

import VideoCoursesScreen from '../../screens/video/CoursesScreen';
import SearchHomeScreen from '../../screens/search/HomeScreen';
import SearchResultsScreen from '../../screens/search/ResultsScreen';

const Stack = createStackNavigator();

// 搜索 Stack
function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={({route, navigation}) => ({
        ...CardScreenOption(route, navigation),
      })}>
      <Stack.Screen name="SearchHome" component={SearchHomeScreen} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
      <Stack.Screen name="VideoCourses" component={VideoCoursesScreen} />
    </Stack.Navigator>
  );
}

export default SearchStack;
