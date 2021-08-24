import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import Slider from "../components/Slider";
import ShowLocation from "../components/ShowLocation";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { userSuscribeItem } from "../store/userReducer";

function ListingDetailsScreen({ route, navigation }) {
  item = route.params;
  const itemSelected = item;
  const dispatch = useDispatch();
  const images = [
    itemSelected.picture1,
    itemSelected.picture2,
    itemSelected.picture3,
  ];

  const handleSuscribe = () => {
    dispatch(userSuscribeItem(itemSelected._id));
    navigation.navigate(routes.LISTINGS);
  };

  return (
    <Screen style={styles.screen}>
      <ScrollView>
        <Text style={itemSelected.price === 0 ? styles.free : styles.price}>
          {itemSelected.price === 0 ? "FREE" : `$${itemSelected.price}`}
        </Text>
        <Slider images={images} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{itemSelected.title}</Text>
          <Text style={styles.description}>{itemSelected.description}</Text>
          <View style={styles.location}></View>
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
          <Button
            title="add to your interests"
            color="primary"
            onPress={handleSuscribe}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: colors.green,
  },
  location: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
    paddingTop: 10,
    backgroundColor: colors.green,
  },
  price: {
    color: colors.danger,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 5,
    backgroundColor: colors.light,
    borderRadius: 10,
    padding: 10,
    position: "absolute",
    textAlign: "right",
    zIndex: 2,
    top: 250,
    right: 50,
  },
  free: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 5,
    backgroundColor: colors.light,
    borderRadius: 10,
    padding: 10,
    position: "absolute",
    textAlign: "right",
    zIndex: 2,
    top: 250,
    right: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 5,
    marginBottom: 3,
  },
  description: {
    fontSize: 20,
    fontWeight: "500",
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 5,
    color: colors.secondary,
  },
  userContainer: {
    marginVertical: 10,
  },
  screen: {
    backgroundColor: colors.green,
  },
});

export default ListingDetailsScreen;
