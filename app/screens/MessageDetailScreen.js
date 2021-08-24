import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import colors from "../config/colors";
import { useDispatch, useSelector } from "react-redux";
import { getUserItems } from "../store/itemReducer";
import { deleteMessage } from "../store/messageReducer";

function MessageDetailScreen({ route }) {
  item = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [removed, setRemoved] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserItems(user._id));
    setRemoved(false);
  }, [removed]);

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    dispatch(getUserItems(user._id));
    setIsLoading(false);
  }, []);

  const { user, userItems } = useSelector((state) => {
    return {
      user: state.userReducer.user,
      userItems: state.itemReducer.userItems,
    };
  });

  let messages = userItems.filter((userItem) => userItem._id === item._id)[0]
    .messages;

  const handleDelete = (messageId) => {
    Alert.alert("Delete", "Are you sure you want to delete this message?", [
      {
        text: "Yes",
        onPress: () => {
          dispatch(deleteMessage(messageId));
          messages.filter((message) => message !== messageId);
          setRemoved(true);
        },
      },
      { text: "No" },
    ]);
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(message) => message._id.toString()}
        renderItem={({ item }) => (
          <ListItem
            chevronColor="white"
            title={`${item.creator.name} ${item.creator.lastname}`}
            subTitle={item.creator.email}
            additionalInfo1={item.creator.phone}
            additionalInfo2={`R://${item.message}`}
            image={{ uri: item.creator.profilePicture }}
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

export default MessageDetailScreen;
