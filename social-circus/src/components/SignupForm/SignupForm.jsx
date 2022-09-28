import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { FormikControl } from "../FormikControl/FormikControl";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TextError } from "../TextError/TextError";
import toast from "react-hot-toast";

export const SignupForm = () => {
  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  };

  const [showPassword, setShowPassword] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationScheme = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter a valid email address"),
    password: Yup.string()
      .required("Can't be empty")
      .min(8, "Password is too short, minimum 8 characters required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must have atleast one uppercase, one lowercase, One Number and one special character"
      ),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Can't be empty"),
    firstName: Yup.string().required("Can't be empty"),
    lastName: Yup.string().required("Can't be empty"),
  });

  const onSubmit = async (values, actions) => {
    const link = await registerUser(values, navigate, dispatch, actions);
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
            <h1 className="my-3 text-3xl font-bold">Create Account</h1>
            <p className="font-semibold text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-blue-500">
                Sign in
              </Link>
            </p>

            <p className="text-gray-500">or</p>
            <div className="flex gap-3 ">
              <FormikControl
                control="input"
                type="text"
                label="First Name"
                labelsOn={false}
                name="firstName"
                placeholder="First Name"
              />
              <FormikControl
                control="input"
                type="text"
                label="Last Name"
                name="lastName"
                placeholder="Last Name"
              />
            </div>

            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
              placeholder="Email"
            />

            <div className="relative my-2 mb-3 flex h-14  w-full flex-col items-start justify-start">
              <Field
                className="relative flex w-full rounded-lg border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm required:border-pink-500 required:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500
              focus:required:border-pink-500 focus:required:ring-pink-500 
            "
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" component={TextError} />
              <div className="absolute  top-3 right-5">
                {showPassword ? (
                  <FiEye onClick={(e) => setShowPassword((prev) => !prev)} />
                ) : (
                  <FiEyeOff onClick={(e) => setShowPassword((prev) => !prev)} />
                )}
              </div>
            </div>
            <div className="relative my-2 mb-3 flex h-14  w-full flex-col items-start justify-start">
              <Field
                className="relative flex w-full rounded-lg border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm required:border-pink-500 required:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500
              focus:required:border-pink-500 focus:required:ring-pink-500 
            "
                type={showPassword ? "text" : "password"}
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <ErrorMessage name="confirmPassword" component={TextError} />
              <div className="absolute  top-3 right-5">
                {showPassword ? (
                  <FiEye onClick={(e) => setShowPassword((prev) => !prev)} />
                ) : (
                  <FiEyeOff onClick={(e) => setShowPassword((prev) => !prev)} />
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={!formik.isValid}
              className="my-3 flex w-full items-center justify-center gap-3 rounded-lg bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600"
            >
              Sign up with email
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
