import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens/HomeScreen";
import { DisabledScreen } from "../screens/DisabledScreen";

const Stack = createNativeStackNavigator();

export const NavigationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'Home'} component={HomeScreen} />
      <Stack.Screen name={'DisabledScreen'} component={DisabledScreen} />
    </Stack.Navigator>
  );
};
