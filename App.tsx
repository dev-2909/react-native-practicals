import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationStack } from './src/navigation/navigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
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