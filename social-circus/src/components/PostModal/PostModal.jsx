import React, { useState, useEffect } from "react";
import { FiImage, FiSmile } from "react-icons/fi";
import Picker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { AddPost, getExplorePosts } from "../../redux/actions/postActions";
import { auth } from "../../firebase";
import { UploadImage } from "../../redux/actions/uploadImageActions";
import toast from "react-hot-toast";
import { defaultAvatar } from "../../config/Constants";

export const PostModal = () => {
  const initialValues = {
    date: "",
    content: "",
    displayName: "",
    imageUrl: "",
    uid: "",
    likes: [],
    comments: [],
    avatar: "",
    username: "",
  };

  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const [form, setForm] = useState(initialValues);
  const [imagePath, setImagePath] = useState(form?.imageUrl);
  const [openEmoji, setOpenEmoji] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setSelectedEmoji(emojiObject);
  };

  useEffect(() => {
    setForm({
      ...form,
      content:
        form.content + (selectedEmoji ? selectedEmoji.emoji.toString() : ""),
    });
  }, [selectedEmoji]);

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setForm({
      ...form,
      content: value,
      displayName: auth?.currentUser?.displayName,
      uid: token,
      imageUrl: imagePath,
      username: user?.username,
      avatar: user?.avatar,
      date: new Date().toLocaleString(),
    });
    setSelectedEmoji(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.content !== "") {
      await AddPost(form, dispatch);
    }
    setForm(initialValues);
    setOpenEmoji(false);
    setImagePath("");
    dispatch(getExplorePosts());
  };

  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const loading = toast.loading("Uploading image...");
    const link = await UploadImage(`posts/${token}/post-cover.jpg`, file);
    toast.success("Uploaded image", { id: loading });
    setImagePath(link);
    setForm({ ...form, imageUrl: link });
  };

  const emojiClickHandler = (e) => {
    e.preventDefault();
    setOpenEmoji((prev) => !prev);
  };

  return (
    <div className="relative flex  h-fit min-h-[13rem] w-full flex-col items-start justify-between gap-4 border-y-2 border-r-2 border-gray-200 bg-white px-3 pt-6">

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="relative flex h-full w-full flex-col items-start justify-between"
      >
        <div className="align-center flex w-full justify-between">
          <div className="w-14 pt-3">
            <img
              src={user?.avatar || defaultAvatar}
              alt="profile of user"
              className="w-full rounded-full"
            />
          </div>

          <textarea
            rows="4"
            name="newPost"
            value={form.content}
            onChange={(e) => handleChange(e)}
            placeholder={`What's on your mind ${user?.firstname}?`}
            className=" h-24 w-full resize-none flex-wrap whitespace-normal break-words rounded-xl border-2 border-transparent px-3 focus:bg-gray-50 focus:outline-none"
          />
        </div>
        {form?.imageUrl && (
          <div className=" my-3 mx-3 flex w-1/2 justify-start ">
            <img
              src={form?.imageUrl}
              alt="profile of user"
              className="mr-auto h-20 w-full rounded-md bg-white object-cover opacity-40"
            />
          </div>
        )}
        <div className="relative mt-auto flex w-full flex-row items-center gap-4 ">
          <div className="group rounded-3xl border-2 border-gray-100 bg-white p-4 hover:border-2 hover:border-blue-300 hover:bg-blue-50 hover:outline-2">
            <label htmlFor="upload-picture">
              <input
                type="file"
                id="upload-picture"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  handleImage(e);
                }}
              />
              <FiImage className="group-hover:font-bold group-hover:text-blue-500 " />
            </label>
          </div>
          <button
            onClick={(e) => emojiClickHandler(e)}
            className={`group rounded-3xl border-2 border-gray-100 bg-white p-4 hover:border-2 hover:border-blue-300 hover:bg-blue-50 hover:outline-2 ${
              openEmoji ? "border-blue-300 bg-blue-50" : ""
            }`}
          >
            <FiSmile className="group-hover:font-bold group-hover:text-blue-500 " />
          </button>
          {openEmoji && (
            <div className="absolute left-16 -bottom-72">
              <Picker
                onEmojiClick={onEmojiClick}
                disableSearchBar={true}
                pickerStyle={{
                  height: "15rem",
                  width: "25rem",
                  borderRadius: "10px",
                }}
              />
            </div>
          )}
          <button className="m-left my-3 flex w-1/4 items-center justify-center gap-3 rounded-3xl bg-blue-600  py-3 px-4 font-semibold text-white hover:bg-blue-600">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};
