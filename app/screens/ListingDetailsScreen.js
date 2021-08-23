import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import Slider from "../components/slider";
import ShowLocation from "../components/ShowLocation";
import routes from "../navigation/routes";

function ListingDetailsScreen({ route, navigation }) {
  item = route.params;
  const itemSelected = item;

  const images = [
    itemSelected.picture1,
    itemSelected.picture2,
    itemSelected.picture3,
  ];

  return (
    <ScrollView>
      <View>
        <Slider images={images} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{itemSelected.title}</Text>
          <Text style={styles.price}>${itemSelected.price}</Text>
          <Text style={styles.description}>{itemSelected.description}</Text>
          <View style={styles.detailsContainer}></View>
          <ShowLocation item={itemSelected} />
          <View style={styles.userContainer}>
            <ListItem
              image={{
                uri: itemSelected.creator.profilePicture,
              }}
              contactLabel="contact"
              title={`${itemSelected.creator.name} ${itemSelected.creator.lastname}`}
              subTitle={itemSelected.creator.email}
              onPress={() => navigation.navigate(routes.CONTACT, itemSelected)}
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
