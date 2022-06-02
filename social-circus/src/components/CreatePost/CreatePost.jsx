import React, { useState } from "react";
import { PostModal } from "../PostModal/PostModal";

export const CreatePost = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => setOpenModal(true);
  return (
    <div>
      <button onClick={handleModal}>Create Post</button>
      <PostModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};
