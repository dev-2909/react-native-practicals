import React from "react";
import { NavigationStack } from "./src/navigation/navigation";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux";
import { PersistGate } from "redux-persist/integration/react";
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationStack />
      </PersistGate>
    </Provider>
  );
};
export default App;
