import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "../Text";
import colors from "../../config/colors";

function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  chevronColor,
  additionalInfo1,
  additionalInfo2,
  contactLabel,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            {contactLabel && (
              <Text style={styles.contactLabel} numberOfLines={1}>
                {contactLabel}
              </Text>
            )}
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </Text>
            )}
            {additionalInfo1 && (
              <Text style={styles.additionalInfo1} numberOfLines={1}>
                {additionalInfo1}
              </Text>
            )}
            {additionalInfo2 && (
              <Text style={styles.additionalInfo2} numberOfLines={0}>
                {additionalInfo2}
              </Text>
            )}
          </View>
          <MaterialCommunityIcons
            color={chevronColor ? colors[chevronColor] : colors.medium}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 25,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  additionalInfo1: {
    color: colors.secondary,
  },
  additionalInfo2: {
    color: colors.danger,
  },
  contactLabel: {
    color: colors.primary,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 20,
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;
