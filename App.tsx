import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NavigationStack } from "./src/navigation/navigation";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <NavigationStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
export default App;
