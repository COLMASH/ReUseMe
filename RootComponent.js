import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";

export default function RootComponent() {
  const getToken = async () => await AsyncStorage.getItem("token");

  const { user } = useSelector((state) => {
    return {
      user: state.userSignInReducer.user,
    };
  });
  console.log(user.name);
  return (
    <NavigationContainer theme={navigationTheme}>
      {user.name !== undefined ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
