import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import Slider from "../components/slider";
import ShowLocation from "../components/ShowLocation";

function ListingDetailsScreen({ route }) {
  item = route.params;

  let images = [item.picture1, item.picture2, item.picture3];

  const { user } = useSelector((state) => {
    return {
      user: state.userReducer.user,
    };
  });

  return (
    <ScrollView>
      <View>
        <Slider images={images} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.detailsContainer}></View>
          <ShowLocation item={item} />
          <View style={styles.userContainer}>
            <ListItem
              image={{
                uri: user.profilePicture,
              }}
              title={`${user.name} ${user.lastname}`}
              subTitle={user.email}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
    backgroundColor: colors.green,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  description: { fontSize: 20, fontWeight: "500" },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
