import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";

import store from "./app/store/store";
import RootComponent from "./RootComponent";

export default function App() {
  return (
    <Provider store={store}>
      <RootComponent />
    </Provider>
  );
}
