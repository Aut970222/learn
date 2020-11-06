import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigator from './MainNavigator';
import ModalScreenOption from './options/ModalScreenOption';

import InformationStack from './stacks/InformationStack';
import TeacherHomeScreen from '../screens/teacher/HomeScreen';

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        mode="modal"
        screenOptions={({route, navigation}) => ({
          ...ModalScreenOption(route, navigation),
        })}>
        <Stack.Screen
          name="Main"
          component={MainNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Information"
          component={InformationStack}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Teacher" component={TeacherHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
