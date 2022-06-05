import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

export const UploadImage = async (folder, file) => {
  const storageRef = ref(storage, `${folder}/${file.name}`);
  const uploadTask = await uploadBytesResumable(storageRef, file);
  const path = uploadTask?.ref?.toString();
  console.log(path);
  //Please ignore the below comments || WIP
  //   const link = await DownloadImage(path);
  //   console.log(link);
  //   return link;

  //   const imageRef = ref(storage, `posts/${id.uid}/post-cover.jpg`);
  //   const response = await uploadBytes(imageRef, image);
  //   const picRef = ref(storage, `posts/${id.uid}/post-cover.jpg`);
  //   const imageResponse = await getMetadata(picRef);
  //   setImagePath(imageResponse);
};

const DownloadImage = async (path) => {
  let link = "";
  const response = await getDownloadURL(ref(storage, path));
  const { url } = response;
  link = url;
  return link;
};
