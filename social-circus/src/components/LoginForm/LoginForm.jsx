import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { FormikControl } from "../FormikControl/FormikControl";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/authSlice";
import { TextError } from "../TextError/TextError";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

export const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState();
  const [form, setForm] = useState(initialValues);

  const validationScheme = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter a valid email address"),
    password: Yup.string().required("Can't be empty"),
  });

  const onSubmit = async (values) => {
    const loading = toast.loading("Logging you in...");
    const link = await loginUser(values, navigate, dispatch, login);
    toast.success("Welcome back to the circus!", { id: loading });
  };

  const testdetails = {
    email: "srejitk@gmail.com",
    password: "sreejithk",
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
            <h1 className="my-3 px-8 text-3xl font-bold">
              Welcome to the Circus
            </h1>
            <p className="px-8 font-semibold text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-blue-500">
                Sign up for free
              </Link>
            </p>
            <p className="text-gray-500">or</p>
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

            <button
              type="submit"
              disabled={!formik.isValid}
              className="my-3 flex w-full items-center justify-center gap-3 rounded-lg bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={(e) => {
                formik.setFieldValue("email", "srejitk@gmail.com", false);
                formik.setFieldValue("password", "sreejithk", false);
              }}
              className="my-3 flex w-full items-center justify-center gap-3 rounded-lg border-2 border-blue-500 bg-white py-2 font-semibold text-blue-500 hover:bg-blue-50"
            >
              Use Test Credentials
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
