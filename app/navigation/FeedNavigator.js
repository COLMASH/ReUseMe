import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ContactScreen from "../screens/ContactScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false, presentation: "modal" }}
  >
    <Stack.Screen name="Listings" component={ListingsScreen} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    <Stack.Screen name="Contact" component={ContactScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
