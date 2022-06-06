import React, { useState, useEffect } from "react";
import { FiImage, FiSmile, FiX, FiXCircle } from "react-icons/fi";
import Picker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddPost,
  EditPost,
  getExplorePosts,
} from "../../redux/actions/postActions";
import { auth, storage } from "../../firebase";
import { getMetadata, ref, uploadBytes } from "firebase/storage";
import { Modal } from "../Modal/Modal";
import { UploadImage } from "../../redux/actions/uploadImageActions";

export const PostModal = ({ openModal, setOpenModal, edit }) => {
  const initialValues = {
    date: "",
    content: "",
    displayName: "",
    imageUrl: "",
    uid: "",
    likes: [],
    comments: [],
  };

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { post } = useSelector((state) => state.post);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [form, setForm] = useState(initialValues);
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
      displayName: auth.currentUser.displayName,
      uid: token,
      imageUrl: imagePath,
      date: edit ? post?.data?.date : new Date().toLocaleString(),
    });
    setSelectedEmoji(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setForm({ ...form, imageUrl: imagePath });
    if (form.content !== "") {
      edit
        ? await EditPost(form, dispatch, post?.id)
        : await AddPost(form, dispatch);
    }
    setForm(initialValues);
    setOpenEmoji(false);
    dispatch(getExplorePosts());
  };

  const handleImage = async (image) => {
    if (image === null) return;
    UploadImage(`posts/${token}`, image);
    //Please ignore the below code || WIP
    // const imageRef = ref(storage, `posts/${id.uid}/post-cover.jpg`);
    // const response = await uploadBytes(imageRef, image);
    // const picRef = ref(storage, `posts/${id.uid}/post-cover.jpg`);
    // const imageResponse = await getMetadata(picRef);
    // setImagePath(imageResponse);
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
      <div className="w-100 relative mx-3 my-3  flex h-72 flex-col items-start justify-between gap-4 rounded-lg border-2 border-gray-100 bg-white px-3 py-6 shadow-md">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="relative flex h-full w-full flex-col items-start justify-between"
        >
          {edit ? (
            <button
              onClick={(e) => closeModal(e)}
              className="absolute right-1 top-1 rounded-full border-2 border-transparent bg-white p-3 hover:border-red-50 hover:bg-red-50"
            >
              <FiX />
            </button>
          ) : null}

          <div className="align-center flex w-full justify-between">
            <div className="w-14 pt-3">
              <img
                src="https://64.media.tumblr.com/75320ca1fcab8631c111abca8bf055a4/fdcf9f0f117edd2e-7b/s250x250_c1/2a81402340070baae8e3eae599d3916facc19fe1.png"
                alt="profile of user"
                className="w-full rounded-full"
              />
            </div>
            <input
              type="textarea"
              name="newPost"
              value={form.content}
              onChange={(e) => handleChange(e)}
              placeholder="What's on your mind?"
              className=" h-24 w-full flex-wrap rounded-xl border-2 border-transparent px-3 focus:bg-gray-50 focus:outline-none"
            />
          </div>
          <div className="relative flex w-full flex-row items-center gap-4 ">
            <div className="group rounded-3xl border-2 border-gray-100 bg-white p-4 hover:border-2 hover:border-blue-300 hover:bg-blue-50 hover:outline-2">
              <label htmlFor="upload-picture">
                <input
                  type="file"
                  id="upload-picture"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    handleImage(e.target.files[0]);
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
            <button className="m-left my-3 flex w-1/4 items-center justify-center gap-3 rounded-xl bg-blue-500  py-2 font-semibold text-white hover:bg-blue-600">
              {edit ? "Update Post" : "Post"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
