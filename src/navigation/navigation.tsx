import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/home";
import { NextScreen } from "../screens/nextScreen";

const Stack = createNativeStackNavigator();

export const NavigationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"Home"} component={Home} />
      <Stack.Screen name={"Next"} component={NextScreen} />
    </Stack.Navigator>
  );
};
