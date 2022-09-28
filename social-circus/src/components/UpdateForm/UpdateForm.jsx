import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextError } from "../TextError/TextError";
import { FiCheck, FiImage } from "react-icons/fi";
import {
  UploadAvatar,
  UploadCover,
} from "../../redux/actions/uploadImageActions";
import toast from "react-hot-toast";
import { updateDetails } from "../../redux/actions/authActions";
import {
  avatarOptions,
  defaultAvatar,
  defaultBio,
  defaultCover,
  defaultPortfolio,
  defaultUsername,
} from "../../config/Constants";

export const UpdateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const initialValues = {
    username: user?.username || "",
    bio: user?.bio || "",
    portfolio: user?.website || "",
    avatar: user?.avatar || "",
    cover: user?.cover || "",
  };

  const validationScheme = Yup.object({
    username: Yup.string().required("Please select a username"),
    bio: Yup.string().required("Can't be empty"),
    portfolio: Yup.string()
      .url("Please enter a valid website")
      .required("Can't be empty"),
  });

  const onSubmit = (values) => {
    const { username, bio, portfolio } = values;
    if (avatarPreview) {
      const profile = {
        username,
        bio,
        portfolio,
        avatar: avatarPreview,
        cover: coverPreview,
      };
      updateDetails(profile, token, dispatch, navigate);
    } else {
      toast.error("Please upload an avatar");
    }
  };

  const handleImage = async (file) => {
    const link =
      file && (await UploadAvatar(`users/${token}/user-avatar.jpg`, file));
    setAvatarPreview(link);
  };

  const handleCover = async (file) => {
    const link =
      file && (await UploadCover(`users/${token}/user-cover.jpg`, file));
    setCoverPreview(link);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationScheme}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="mx-auto flex h-fit w-fit flex-col items-center justify-center rounded-md px-5 pb-6">
            <h1 className="my-3 px-8 text-3xl font-bold">
              Update your profile
            </h1>
            <p className="mb-6 text-gray-500">
              Complete your profile to get verified.
            </p>
            <div className="mb-4 flex items-start gap-4">
              {" "}
              <div>
                {" "}
                <div className="group rounded-3xl border-2 border-gray-100 bg-white p-4 hover:border-2 hover:border-blue-300 hover:bg-blue-50 hover:outline-2">
                  <label htmlFor="avatar">
                    <input
                      type="file"
                      id="avatar"
                      accept="image/*"
                      className="hidden"
                      name="avatar"
                      onChange={(e) => {
                        handleImage(e.target.files[0]);
                      }}
                    />

                    {!initialValues.avatar ? (
                      <img
                        src={initialValues.avatar}
                        alt="user-avatar-preview"
                        className="h-10 w-10 group-hover:text-blue-500"
                      />
                    ) : (
                      <FiImage className="h-10 w-10 p-2 group-hover:font-bold group-hover:text-blue-500 " />
                    )}
                  </label>
                </div>
                <p className="mt-4 font-semibold text-gray-500">Upload</p>
              </div>
              <p className="py-6 font-medium">or</p>
              <div>
                <div className="flex h-fit">
                  {avatarOptions.map((option) => (
                    <div
                      key={option.id}
                      name="avatar"
                      value={option.avatar}
                      onClick={(e) => {
                        setAvatarPreview(option.avatar);
                      }}
                      className="group relative h-20 w-20 overflow-hidden rounded-3xl border-4 border-transparent bg-white hover:border-black  hover:brightness-95"
                    >
                      <img
                        className={`h-full w-full object-cover  group-hover:text-blue-500 ${
                          avatarPreview === option.avatar
                            ? "brightness-90"
                            : "brightness-75"
                        }`}
                        src={option.avatar}
                        alt=""
                      />
                      {avatarPreview === option.avatar ? (
                        <FiCheck className="absolute top-0 left-0 z-10 h-10 w-10 translate-y-1/2 translate-x-1/2 p-1 text-lg font-bold text-white group-hover:font-bold group-hover:text-transparent " />
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-4 font-semibold text-gray-500">Choose one</p>
              </div>
            </div>
            <p className="mb-4 text-lg font-semibold text-zinc-700">
              Upload a cover image
            </p>
            <div className="cover group relative mb-2 flex h-fit min-h-[10rem] w-2/3 flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-gray-100 bg-blue-700/10 bg-white hover:border-2 hover:border-blue-300 hover:bg-blue-50 hover:outline-2">
              <FiImage className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 p-2 text-blue-500" />
              <label htmlFor="cover">
                <input
                  type="file"
                  id="cover"
                  accept="image/*"
                  className="relative hidden"
                  name="cover"
                  onChange={(e) => {
                    handleCover(e.target.files[0]);
                  }}
                />
                <img
                  src={initialValues.cover || defaultCover}
                  alt="user-avatar-preview"
                  className={` relative w-full object-cover group-hover:text-blue-500 group-hover:blur-md`}
                />
              </label>
            </div>
            <p className="mb-2 text-lg font-semibold text-zinc-700">
              Fill your Details
            </p>
            <div className="relative mb-2 flex h-14  w-[80%] flex-col items-center justify-center">
              {" "}
              <Field
                type="text"
                label="username"
                name="username"
                placeholder={
                  initialValues.username
                    ? `@${initialValues.username}`
                    : defaultUsername
                }
                className="relative flex w-[80%] rounded-lg border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm required:border-pink-500 required:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500
              focus:required:border-pink-500 focus:required:ring-pink-500 
            "
              />
              <ErrorMessage name="username" component={TextError} />
            </div>
            <div className="relative mb-2 flex h-14  w-[80%] flex-col items-center justify-center">
              {" "}
              <Field
                type="text"
                label="bio"
                name="bio"
                placeholder={
                  initialValues.bio ? `${initialValues.bio}` : defaultBio
                }
                className="relative flex w-[80%] rounded-lg border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm required:border-pink-500 required:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500
              focus:required:border-pink-500 focus:required:ring-pink-500 
            "
              />
              <ErrorMessage name="bio" component={TextError} />
            </div>

            <div className="relative mx-auto mb-2 flex h-14 w-[80%] flex-col items-center justify-center ">
              {" "}
              <Field
                type="text"
                label="portfolio"
                name="portfolio"
                placeholder={
                  initialValues.portfolio
                    ? `${initialValues.portfolio}`
                    : defaultPortfolio
                }
                className="relative flex w-[80%] rounded-lg border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm required:border-pink-500 required:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500
              focus:required:border-pink-500 focus:required:ring-pink-500 
            "
              />
              <ErrorMessage name="portfolio" component={TextError} />
            </div>

            <button
              type="submit"
              disabled={!formik.isValid}
              className="my-3 flex w-2/3 items-center justify-center gap-3 rounded-lg bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600 disabled:bg-slate-400"
            >
              Update Profile
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
