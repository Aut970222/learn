import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CardScreenOption from '../options/CardScreenOption';

import InformationHomeScreen from '../../screens/information/HomeScreen';
import InformationArticlesScreen from '../../screens/information/ArticlesScreen';

const Stack = createStackNavigator();

// 新闻 Stack
function InformationStack() {
  return (
    <Stack.Navigator
      screenOptions={({route, navigation}) => ({
        ...CardScreenOption(route, navigation),
      })}>
      <Stack.Screen name="InformationHome" component={InformationHomeScreen} />
      <Stack.Screen
        name="InformationArticles"
        component={InformationArticlesScreen}
      />
    </Stack.Navigator>
  );
}

export default InformationStack;
