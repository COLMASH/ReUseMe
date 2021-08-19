import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import { getAllItems } from "../store/itemReducer";

function ListingsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    dispatch(getAllItems());
    setIsLoading(false);
  }, []);

  const { items } = useSelector((state) => {
    return {
      items: state.itemReducer.items,
    };
  });

  return (
    <Screen style={styles.screen}>
      <FlatList
        refreshing={isLoading}
        onRefresh={onRefresh}
        data={items}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$" + item.price}
            image={{
              uri: item.picture1,
            }}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.green,
  },
});

export default ListingsScreen;
