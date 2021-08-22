import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MyItemsScreen from "../screens/MyItemsScreen";
import UserUpdate from "../screens/UserUpdate";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Account"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="MyItems" component={MyItemsScreen} />
    <Stack.Screen name="UserUpdate" component={UserUpdate} />
  </Stack.Navigator>
);

export default AccountNavigator;
