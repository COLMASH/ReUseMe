import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Alert } from "react-native";

import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import colors from "../config/colors";
import { useDispatch, useSelector } from "react-redux";
import routes from "../navigation/routes";
import { getUser, userUnsuscribeItem } from "../store/userReducer";

function SuscribedItemsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [removed, setRemoved] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    setRemoved(false);
  }, [removed]);

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    dispatch(getUser());
    setIsLoading(false);
  }, []);

  const { user } = useSelector((state) => {
    return {
      user: state.userReducer.user,
    };
  });

  const handleDelete = (itemId) => {
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      {
        text: "Yes",
        onPress: () => {
          dispatch(userUnsuscribeItem(itemId));
          suscribedItems.filter((item) => item !== itemId);
          setRemoved(true);
        },
      },
      { text: "No" },
    ]);
  };

  let suscribedItems = user.suscribedItems;

  return (
    <Screen style={styles.container}>
      <FlatList
        data={suscribedItems}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={{
              uri: item.picture1,
            }}
            onPress={() => navigation.navigate(routes.LISTINGDETAILS, item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item._id)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={isLoading}
        onRefresh={onRefresh}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default SuscribedItemsScreen;
