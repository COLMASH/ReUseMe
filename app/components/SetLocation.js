import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch } from "react-redux";
import { setItemLocation } from "../store/itemReducer";

const { width } = Dimensions.get("window");
const height = width * 0.8;

function SetLocation() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState({
    latitude: 4.624335,
    longitude: -74.063644,
  });

  const handleSetLocation = (e) => {
    setLocation({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
    dispatch(setItemLocation(location));
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 4.624335,
        longitude: -74.063644,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={location}
        draggable={true}
        onDragEnd={handleSetLocation}
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

export default SetLocation;
