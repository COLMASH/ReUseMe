import React from "react";
import { Formik } from "formik";

function AppForm({
  initialValues,
  onSubmit,
  onReset,
  validationSchema,
  children,
  values,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      onReset={onReset}
      validationSchema={validationSchema}
      values={values}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
