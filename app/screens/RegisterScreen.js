import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import { useDispatch } from "react-redux";
import { userSignup } from "../store/userReducer";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  lastname: Yup.string().required().label("Last Name"),
  phone: Yup.number().required().min(6).label("Phone"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const dispatch = useDispatch();

  const handleSignUp = ({ name, lastname, phone, email, password }) => {
    dispatch(userSignup(name, lastname, phone, email, password));
    alert("User registered successfully!"); //Pendiente mejorar implementación de alerta
  };

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          name: "",
          lastname: "",
          phone: "",
          email: "",
          password: "",
        }}
        onSubmit={handleSignUp}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
        <FormField
          autoCorrect={false}
          icon="account"
          name="lastname"
          placeholder="Last Name"
        />
        <FormField
          autoCorrect={false}
          icon="phone"
          name="phone"
          placeholder="Phone"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.green,
  },
});

export default RegisterScreen;
