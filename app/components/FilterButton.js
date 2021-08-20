import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Text from "./Text";
import colors from "../config/colors";

function FilterButton({ callback, text, id, selectedIndex }) {
  const clicked = selectedIndex === id;

  return (
    <TouchableOpacity
      style={[
        styles.Touchable,
        { backgroundColor: clicked ? colors.danger : colors.primary },
        { borderColor: clicked ? colors.danger : colors.primary },
      ]}
      onPress={() => {
        callback(id);
      }}
    >
      <Text
        style={[styles.text, { color: clicked ? colors.white : colors.white }]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Touchable: {
    borderRadius: 20,
    borderWidth: 2,
    padding: 10,
  },
  text: {
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default FilterButton;
