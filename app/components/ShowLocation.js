import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Circle } from "react-native-maps";

import colors from "../config/colors";

const { width } = Dimensions.get("window");
const height = width * 0.8;

function ShowLocation({ item }) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Circle
        center={{
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
        }}
        radius={2000}
        fillColor={colors.dangerMap}
        strokeWidth={2}
        strokeColor={colors.danger}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: width,
    height: height,
  },
});

export default ShowLocation;
