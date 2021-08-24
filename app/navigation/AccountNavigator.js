import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MyItemsScreen from "../screens/MyItemsScreen";
import UserUpdateScreen from "../screens/UserUpdateScreen";
import ItemUpdateScreen from "../screens/ItemUpdateScreen";
import MessageDetailScreen from "../screens/MessageDetailScreen";
import SuscribedItemsScreen from "../screens/SuscribedItemsScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Accountt"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Messages"
      component={MessagesScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MyItems"
      component={MyItemsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="UserUpdate"
      component={UserUpdateScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ItemUpdate"
      component={ItemUpdateScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MessageDetail"
      component={MessageDetailScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SuscribedItems"
      component={SuscribedItemsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
