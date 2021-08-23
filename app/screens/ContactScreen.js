import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import routes from "../navigation/routes";
import { Form, FormField, SubmitButton } from "../components/forms";
import Button from "../components/Button";
import { createMessage } from "../store/messageReducer";

const validationSchema = Yup.object().shape({
  message: Yup.string().required().label("Message"),
});

function ContactScreen({ route, navigation }) {
  item = route.params;
  const itemSelected = item;

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleCreateMessage = ({ message }, onSubmitProps) => {
    dispatch(createMessage(message, itemSelected._id));
    onSubmitProps.resetForm();
    setMessage("");
    navigation.navigate(routes.LISTING_DETAILS, itemSelected);
  };

  const handleReset = () => {
    setMessage("");
  };

  return (
    <View style={styles.detailsContainer}>
      <ListItem
        image={{
          uri: itemSelected.creator.profilePicture,
        }}
        title={`${itemSelected.creator.name} ${itemSelected.creator.lastname}`}
        additionalInfo1={itemSelected.creator.email}
        additionalInfo2={itemSelected.creator.phone}
        chevronColor="white"
      />
      <Form
        initialValues={{
          message: "",
        }}
        onSubmit={handleCreateMessage}
        validationSchema={validationSchema}
        onReset={handleReset}
      >
        <FormField
          maxLength={255}
          multiline
          name="message"
          numberOfLines={5}
          placeholder="Message"
          onChange={(e) => setMessage(e)}
          value={message}
        />
        <SubmitButton title="Send Message" />
        <Button
          title="Cancel"
          color="danger"
          onPress={() =>
            navigation.navigate(routes.LISTING_DETAILS, itemSelected)
          }
        />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
    backgroundColor: colors.green,
    flex: 1,
  },
  description: { fontSize: 20, fontWeight: "500" },
  userContainer: {
    marginVertical: 40,
  },
});

export default ContactScreen;
