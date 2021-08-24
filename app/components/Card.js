import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import Text from "./Text";
import colors from "../config/colors";

const { width } = Dimensions.get("window");
const height = width * 0.6;

function Card({ title, subTitle, image, category, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </Text>
          <Text style={styles.category} numberOfLines={1}>
            {category}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 15,
  },
  image: {
    width,
    height,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 15,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    marginBottom: 3,
    backgroundColor: colors.light,
    paddingLeft: 10,
    borderRadius: 20,
  },
  title: {
    marginBottom: 3,
    backgroundColor: colors.light,
    borderRadius: 20,
    paddingLeft: 10,
  },
  category: {
    color: colors.danger,
    paddingLeft: 10,
    backgroundColor: colors.light,
    borderRadius: 20,
  },
});

export default Card;
