import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { FormikControl } from "../FormikControl/FormikControl";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const initialValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };

  const validationScheme = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter a valid email address"),
    password: Yup.string().required("Can't be empty"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Can't be empty"),
    firstName: Yup.string().required("Can't be empty"),
    lastName: Yup.string().required("Can't be empty"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationScheme}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="mx-auto flex h-fit w-fit flex-col items-center rounded-md px-5 pb-6">
            <h1 className="my-3 px-8 text-3xl font-bold">Welcome to Area 51</h1>
            <p className="px-8 font-semibold text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-blue-500">
                Sign up for free
              </Link>
            </p>
            <button className="my-3 flex w-full items-center justify-center gap-3 rounded-lg bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600">
              <FaGoogle /> Continue with Google
            </button>
            <p className="text-gray-500">or</p>

            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
              placeholder="Email"
            />
            <FormikControl
              control="input"
              type="password"
              label="Password"
              name="password"
              placeholder="Password"
            />

            <button
              type="submit"
              disabled={!formik.isValid}
              className="my-3 flex w-full items-center justify-center gap-3 rounded-lg bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600"
            >
              Sign in
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
