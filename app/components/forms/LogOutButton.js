import React from "react";

import Button from "../Button";

function LogOutButton({ title, onPress }) {
  return <Button title={title} onPress={onPress} color="danger" />;
}

export default LogOutButton;
