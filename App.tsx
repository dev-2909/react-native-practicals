import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationStack } from './src/navigation/navigation';
import {HomeContextProvider} from "./src/context/HomeContext";

const App = () => {
  return (
      <NavigationContainer>
         <HomeContextProvider>
            <NavigationStack />
        </HomeContextProvider>
      </NavigationContainer>
  );
};
export default App;
