import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker as Picker,
  ResetButton,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import colors from "../config/colors";
import { useDispatch } from "react-redux";
import { createItem } from "../store/itemReducer";
import routes from "../navigation/routes";
import { getAllItems } from "../store/itemReducer";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    backgroundColor: colors.secondary,
    icon: "wheelchair-accessibility",
    label: "Wheel chairs (Elec.)",
    value: 1,
  },
  {
    backgroundColor: colors.primary,
    icon: "human-wheelchair",
    label: "Wheel chairs (Mech.)",
    value: 4,
  },
  {
    backgroundColor: colors.secondary,
    icon: "chair-rolling",
    label: "Ergonomic Chairs",
    value: 3,
  },
  {
    backgroundColor: colors.primary,
    icon: "hiking",
    label: "Canes & Crutches",
    value: 2,
  },
  {
    backgroundColor: colors.secondary,
    icon: "seat-individual-suite",
    label: "Hospital Beds",
    value: 5,
  },
  {
    backgroundColor: colors.primary,
    icon: "pill",
    label: "Medicines",
    value: 6,
  },
  {
    backgroundColor: colors.secondary,
    icon: "ear-hearing",
    label: "Audiovisual Aid",
    value: 7,
  },
  {
    backgroundColor: colors.primary,
    icon: "dog-service",
    label: "Guide Dogs",
    value: 8,
  },
  {
    backgroundColor: colors.secondary,
    icon: "cog-outline",
    label: "Other",
    value: 9,
  },
];

function ListingEditScreen({ navigation }) {
  const location = useLocation();
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleCreateItem = (
    { title, price, description, category, images },
    onSubmitProps
  ) => {
    dispatch(createItem(title, price, description, category, images));
    dispatch(getAllItems());
    onSubmitProps.resetForm(), setPrice("");
    setTitle("");
    setDescription("");
    navigation.navigate(routes.FEED);
  };

  const handleReset = () => {
    setPrice("");
    setTitle("");
    setDescription("");
  };

  return (
    <Screen style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Form
          initialValues={{
            title: "",
            price: "",
            description: "",
            category: null,
            images: [],
          }}
          onSubmit={handleCreateItem}
          validationSchema={validationSchema}
          onReset={handleReset}
        >
          <FormImagePicker name="images" />
          <FormField
            maxLength={100}
            name="title"
            placeholder="Title"
            onChange={(e) => setTitle(e)}
            value={title}
          />
          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
            width={120}
            onChange={(e) => setPrice(e)}
            value={price}
          />
          <Picker
            items={categories}
            name="category"
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Category"
            width="70%"
          />
          <FormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={2}
            placeholder="Description"
            onChange={(e) => setDescription(e)}
            value={description}
          />
          <SubmitButton title="Post Item" />
          <ResetButton title="Reset Form" />
        </Form>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.green,
  },
});
export default ListingEditScreen;
