import React, { useState } from "react";
import { FiFeather } from "react-icons/fi";
import { PostModal } from "../PostModal/PostModal";

export const CreatePost = () => {
  const [openModal, setOpenModal] = useState(true);
  return (
    <div>
      <PostModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};
