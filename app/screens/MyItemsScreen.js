import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import colors from "../config/colors";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, getUserItems } from "../store/itemReducer";
import routes from "../navigation/routes";

function MyItemsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserItems(user._id));
  }, []);

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    dispatch(getUserItems(user._id));
    setIsLoading(false);
  }, []);

  const { userItems, user } = useSelector((state) => {
    return {
      userItems: state.itemReducer.userItems,
      user: state.userReducer.user,
    };
  });

  const handleDelete = (itemId) => {
    dispatch(deleteItem(itemId));
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        data={userItems}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={{
              uri: item.picture1,
            }}
            onPress={() => navigation.navigate(routes.ITEMUPDATE, item)}
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
  },
});

export default MyItemsScreen;
