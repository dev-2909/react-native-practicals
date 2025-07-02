import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/home";
import disableItems from "../screens/disableItems";

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
      <Stack.Screen name={"DisableItems"} component={disableItems} />
    </Stack.Navigator>
  );
};
