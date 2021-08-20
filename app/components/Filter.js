import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FilterButton from "./FilterButton";

function Filter({ data, onValueChange }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleValueChange = (id, category) => {
    setSelectedIndex(id);
    if (onValueChange) {
      onValueChange(category);
    }
  };

  const dataPreFiltered = data
    .map((item) => {
      return item.category;
    })
    .sort();

  dataPreFiltered.unshift("ALL");

  const dataFiltered = dataPreFiltered.filter((category, index) => {
    return dataPreFiltered.indexOf(category) === index;
  });

  return (
    <View style={styles.view}>
      {dataFiltered.map(
        (category, index) =>
          !!category && (
            <FilterButton
              text={category}
              key={index}
              id={index}
              selectedIndex={selectedIndex}
              callback={(id) => handleValueChange(id, category)}
            />
          )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
  },
});

export default Filter;
