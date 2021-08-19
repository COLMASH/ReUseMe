import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function ResetButton({ title }) {
  const { handleReset } = useFormikContext();

  return <Button color="danger" title={title} onPress={handleReset} />;
}

export default ResetButton;
