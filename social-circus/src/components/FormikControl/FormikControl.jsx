import React from "react";
import { Input } from "../Input/Input";
import { TextArea } from "../TextArea/TextArea";

export const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      <TextArea {...rest} />;
    default:
      return null;
  }
};
