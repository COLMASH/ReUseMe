import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import colors from "../config/colors";
import { useDispatch } from "react-redux";
import { createItem } from "../store/itemReducer";

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

function ListingEditScreen() {
  const location = useLocation();

  const dispatch = useDispatch();
  const handleCreateItem = ({
    title,
    price,
    description,
    category,
    images,
  }) => {
    dispatch(createItem(title, price, description, category, images));
  };

  return (
    <Screen style={styles.container}>
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
      >
        <FormImagePicker name="images" />
        <FormField maxLength={100} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
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
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post Item" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
