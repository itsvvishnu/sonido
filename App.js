import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./store";
import BottomTab from "./screens/BottomTab";
import { NavigationContainer } from "@react-navigation/native";

const store = configureStore();

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <BottomTab />
        </NavigationContainer>
      </Provider>
    );
  }
}
export default App;
