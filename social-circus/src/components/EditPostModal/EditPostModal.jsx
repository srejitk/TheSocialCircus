import React, { useState, useEffect } from "react";
import { FiImage, FiSmile, FiX } from "react-icons/fi";
import Picker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { EditPost, getExplorePosts } from "../../redux/actions/postActions";
import { auth } from "../../firebase";
import { Modal } from "../Modal/Modal";
import { UploadImage } from "../../redux/actions/uploadImageActions";
import { defaultAvatar } from "../../config/Constants";
import toast from "react-hot-toast";

export const EditPostModal = ({ openModal, setOpenModal, edit }) => {
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth);
  const { post } = useSelector((state) => state.post);
  const initialValues = {
    date: "",
    content: post?.content,
    imageUrl: post?.imageUrl || "",
    avatar: post?.avatar,
  };
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
      date: new Date().toLocaleString(),
    });
    setSelectedEmoji(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.content !== "") {
      await EditPost(form, dispatch, post?.id);
    }
    setForm(initialValues);
    setOpenEmoji(false);
    setImagePath("");
    dispatch(getExplorePosts());
    closeModal();
  };

  const handleEditImage = async (e) => {
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

  const closeModal = (e) => {
    setOpenModal(false);
  };

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className="relative mx-3 my-3 flex  h-72 w-full flex-col items-start justify-between gap-4 rounded-lg border-2 border-gray-100 bg-white px-3 py-6 shadow-md">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="relative flex h-full w-full flex-col items-start justify-between"
        >
          <button
            onClick={(e) => closeModal(e)}
            className="absolute right-1 top-1 rounded-full border-2 border-transparent bg-white p-3 hover:border-red-50 hover:bg-red-50"
          >
            <FiX />
          </button>

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
                alt="post cover"
                className="mr-auto h-20 w-full rounded-md bg-white object-cover opacity-40"
              />
            </div>
          )}
          <div className="relative mt-auto flex w-full flex-row items-center gap-4 ">
            <div className="group rounded-3xl border-2 border-gray-100 bg-white p-4 hover:border-2 hover:border-blue-300 hover:bg-blue-50 hover:outline-2">
              <label htmlFor="edit-upload-picture">
                <input
                  type="file"
                  id="edit-upload-picture"
                  accept="image/*"
                  name="postcover"
                  className="hidden"
                  onChange={(e) => handleEditImage(e)}
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
            <button className="m-left my-3 flex w-1/4 items-center justify-center gap-3 rounded-xl bg-blue-500  py-2 font-semibold text-white hover:bg-blue-600">
              Update Post
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
