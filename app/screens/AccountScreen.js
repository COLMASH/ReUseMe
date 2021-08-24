import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import { userLogOut } from "../store/userReducer";
import { getUser } from "../store/userReducer";
import LogOutButton from "../components/forms/LogOutButton";

const menuItems = [
  {
    title: "My Items",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.MYITEMS,
  },
  {
    title: "I'm interested",
    icon: {
      name: "cart",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.INTERESTS,
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.MESSAGES,
  },
];

function AccountScreen({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const { user } = useSelector((state) => {
    return {
      user: state.userReducer.user,
    };
  });

  const handleLogOut = () => {
    Alert.alert("Log Out", "Are you sure you want to end session?", [
      {
        text: "Yes",
        onPress: () => {
          dispatch(userLogOut());
        },
      },
      { text: "No" },
    ]);
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={`${user.name} ${user.lastname}`}
          subTitle={user.email}
          image={{
            uri: user.profilePicture,
          }}
          onPress={() => navigation.navigate(routes.USERUPDATE)}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <LogOutButton
        title="Log Out"
        onPress={handleLogOut}
        color={colors.danger}
        backgroundColor={colors.danger}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.green,
    paddingLeft: 10,
    paddingRight: 10,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
