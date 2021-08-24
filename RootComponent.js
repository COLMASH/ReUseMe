import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AppLoading from "expo-app-loading";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { getUser } from "./app/store/userReducer";
import authStorage from "./app/auth/storage";

export default function RootComponent() {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  const restoreToken = async () => {
    const token = await authStorage.getToken();
    if (!token) return;
    return token;
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const { user } = useSelector((state) => {
    return {
      user: state.userReducer.user,
    };
  });

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreToken}
        onError={console.warn}
        onFinish={() => setIsReady(true)}
      />
    );

  return (
    <NavigationContainer theme={navigationTheme}>
      {user.name !== undefined ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
