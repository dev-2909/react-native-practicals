import React, {useEffect, useState} from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BlockListItem from "./BlockListItem";
import ListItem from "./ListItem";

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={'ListItem'}>
            <Stack.Screen name={'BlockListItem'} component={BlockListItem} />
            <Stack.Screen name={'ListItem'} component={ListItem} />
        </Stack.Navigator>
    )
}

export default AppNavigation
