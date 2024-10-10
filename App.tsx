import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationStack } from './src/navigation/navigation';
import { Provider } from "react-redux";

import store from "./src/store";

const App = () => {
  return (
      <Provider store={store}>
          <NavigationContainer>
              <NavigationStack />
          </NavigationContainer>
      </Provider>
  );
};
export default App;
