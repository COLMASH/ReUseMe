import React, { useState } from "react";
import { View, Image, StyleSheet, ScrollView, Dimensions } from "react-native";

import colors from "../config/colors";
import Text from "./Text";

const { width } = Dimensions.get("window");
const height = width * 0.8;

function Slider({ images }) {
  const [active, setActive] = useState(0);

  const handleScroll = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  };

  return (
    <View>
      <ScrollView
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={styles.scroll}
      >
        {images.map(
          (image, index) =>
            !!image && (
              <Image key={index} style={styles.image} source={{ uri: image }} />
            )
        )}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map(
          (i, k) =>
            !!i && (
              <Text
                key={k}
                style={
                  k == active ? styles.pagingActiveText : styles.pagingText
                }
              >
                ⬤
              </Text>
            )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width,
    height,
    backgroundColor: colors.green,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  pagingText: { fontSize: width / 30, color: colors.black, margin: 3 },
  pagingActiveText: {
    fontSize: width / 30,
    color: colors.primary,
    margin: 3,
  },
  image: { width, height, resizeMode: "contain", borderRadius: 10 },
});

export default Slider;
