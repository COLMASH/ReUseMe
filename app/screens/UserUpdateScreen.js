import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import { useDispatch, useSelector } from "react-redux";
import colors from "../config/colors";
import FormUserImagePicker from "../components/forms/FormUserImagePicker";
import { updateUser } from "../store/userReducer";
import routes from "../navigation/routes";
import Button from "../components/Button";

const validationSchema = Yup.object().shape({
  name: Yup.string().label("Name"),
  lastname: Yup.string().label("Last Name"),
  phone: Yup.number().min(6).label("Phone"),
  email: Yup.string().email().label("Email"),
});

function UserUpdate({ navigation }) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleUpdateProfile = (
    { name, lastname, phone, email, image },
    onSubmitProps
  ) => {
    dispatch(updateUser(name, lastname, phone, email, image));
    onSubmitProps.resetForm(), setName("");
    setLastname("");
    setPhone("");
    setEmail("");
    navigation.navigate(routes.ACCOUNT);
  };

  const { user } = useSelector((state) => {
    return {
      user: state.userReducer.user,
    };
  });

  return (
    <Screen style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Form
          initialValues={{
            name: "",
            lastname: "",
            phone: "",
            email: "",
            image: [user.profilePicture],
          }}
          onSubmit={handleUpdateProfile}
          validationSchema={validationSchema}
        >
          <FormUserImagePicker name="image" />
          <FormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
            onChange={(e) => setName(e)}
            value={name}
          />
          <FormField
            autoCorrect={false}
            icon="account"
            name="lastname"
            placeholder="Last Name"
            onChange={(e) => setLastname(e)}
            value={lastname}
          />
          <FormField
            autoCorrect={false}
            icon="phone"
            name="phone"
            placeholder="Phone"
            onChange={(e) => setPhone(e)}
            value={phone}
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
            onChange={(e) => setEmail(e)}
            value={email}
          />
          <SubmitButton title="Update Profile" />
          <Button
            title="Cancel"
            color="danger"
            onPress={() => navigation.navigate(routes.ACCOUNT)}
          />
        </Form>
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 0,
    backgroundColor: colors.green,
  },
});

export default UserUpdate;
