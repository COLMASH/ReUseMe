import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import ImageInputList from "../ImageInputList";

function FormImagePicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  const imageUrisFilt = imageUris.filter((image) => {
    return image !== "" && image !== undefined;
  });

  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUrisFilt, uri]);
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUrisFilt.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      <ImageInputList
        imageUris={imageUrisFilt}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormImagePicker;
