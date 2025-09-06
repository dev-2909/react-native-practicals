import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/home';
import DisabledPhotosScreen from '../screens/DisabledPhotosScreen';

const Stack = createNativeStackNavigator();

export const NavigationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'Home'} component={Home} />
      <Stack.Screen
        name={'DisabledPhotosScreen'} component={DisabledPhotosScreen}
        options={{
          headerShown: true,
          title: "Disabled Photos",
        }}
      />
    </Stack.Navigator>
  );
};
