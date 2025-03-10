import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/home';
import {BlockList} from "../screens/BlockList";

const Stack = createNativeStackNavigator();

export const NavigationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        // headerShown: false,
      }}>
      <Stack.Screen name={'Home'} component={Home} options={{headerShown: false}} />
        <Stack.Screen name={'BlockList'} component={BlockList}/>
    </Stack.Navigator>
  );
};
