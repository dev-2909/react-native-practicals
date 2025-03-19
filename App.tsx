import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationStack } from './src/navigation/navigation';
import {HomeContextProvider} from "./src/context/HomeContext";
import ListItem from "./src2/ListItem";
import {Text} from "react-native";
import {store} from "./src2/Store";
import {Provider} from "react-redux";
import AppNavigation from "./src2/AppNavigation";

const App = () => {
  return (
      // <NavigationContainer>
      //    <HomeContextProvider>
      //       <NavigationStack />
      //   </HomeContextProvider>
      // </NavigationContainer>
      <Provider store={store}>
      <NavigationContainer>
       <AppNavigation />
      </NavigationContainer>
      </Provider>

  );
};
export default App;
