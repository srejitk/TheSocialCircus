import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextError } from "../TextError/TextError";

export const Input = (props) => {
  const { label, name, labelsOn, ...rest } = props;
  return (
    <div className="relative my-2 mb-3 flex h-14  w-full flex-col items-start justify-start">
      {labelsOn ? (
        <label htmlFor={name} className="text-md rounded-lg px-3">
          {label}
        </label>
      ) : null}
      <Field
        id={name}
        name={name}
        {...rest}
        className="flex w-full rounded-lg border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm required:border-pink-500 required:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500
        focus:required:border-pink-500 focus:required:ring-pink-500 
      "
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};
