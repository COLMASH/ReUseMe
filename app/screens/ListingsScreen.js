import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import { getAllItems } from "../store/itemReducer";
import Filter from "../components/Filter";
import Text from "../components/Text";

function ListingsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("ALL");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    dispatch(getAllItems());
    setIsLoading(false);
  }, []);

  const { items, user } = useSelector((state) => {
    return {
      items: state.itemReducer.items,
      user: state.userReducer.user,
    };
  });

  let itemsFiltered = items;

  if (items.length > 0) {
    itemsFiltered = items.filter((item) => {
      return item.category === category;
    });
  }

  return (
    <Screen style={styles.screen}>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
        horizontal={true}
      >
        {items.length > 0 && (
          <Filter data={items} onValueChange={(e) => setCategory(e)} />
        )}
      </ScrollView>
      <FlatList
        style={styles.list}
        refreshing={isLoading}
        onRefresh={onRefresh}
        data={category === "ALL" ? items : itemsFiltered}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View>
            <Card
              title={item.title}
              subTitle={item.price === 0 ? "FREE" : "$" + item.price}
              category={item.category}
              image={{
                uri: item.picture1,
              }}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
            {!!item.users && item.users.indexOf(user._id) !== -1 && (
              <View style={styles.suscribed}>
                <Text style={styles.suscribedText}>I MIGHT NEED IT</Text>
              </View>
            )}
          </View>
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
  scroll: {
    position: "absolute",
    padding: 0,
    marginRight: -40,
  },
  list: {
    marginTop: 50,
  },
  suscribed: {
    position: "absolute",
    backgroundColor: colors.greenTrans,
    zIndex: 2,
    color: colors.danger,
    width: "90%",
    height: "17%",
    transform: [{ rotate: "-30deg" }],
    padding: 15,
    borderRadius: 15,
    top: 100,
    right: 15,
  },
  suscribedText: {
    textAlign: "center",
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default ListingsScreen;
