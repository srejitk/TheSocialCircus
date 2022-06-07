import { toast } from "react-hot-toast";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

export const UploadImage = async (path, file) => {
  try {
    const imageRef = ref(storage, path);
    const response = await uploadBytesResumable(imageRef, file);
    const pathName = response?.ref?.toString();
    const gsReference = ref(storage, pathName);
    const url = await getDownloadURL(gsReference);
    return url;
  } catch (error) {
    console.log(error);
    toast.error("Couldn't upload image");
  }
};

export const UploadAvatar = async (path, file) => {
  try {
    const imageRef = ref(storage, path);
    const response = await uploadBytesResumable(imageRef, file);
    const pathName = response?.ref?.toString();
    const gsReference = ref(storage, pathName);
    const url = await getDownloadURL(gsReference);
    return url;
  } catch (error) {
    console.log(error);
    toast.error("Couldn't upload Avatar");
  }
};

export const UploadCover = async (path, file) => {
  try {
    const imageRef = ref(storage, path);
    const response = await uploadBytesResumable(imageRef, file);
    const pathName = response?.ref?.toString();
    const gsReference = ref(storage, pathName);
    const url = await getDownloadURL(gsReference);
    return url;
  } catch (error) {
    console.log(error);
    toast.error("Couldn't upload Cover");
  }
};
