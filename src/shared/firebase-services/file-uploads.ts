import { firebaseStorage } from "@/shared/config/firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

export const HandleFileUpload = async (
  file: File,
  directory: string,
  key: string,
  setProgress: Function,
  setUrls: Function
) => {
  if (!file) {
    throw new Error("No File");
  }

  const fileRef = ref(firebaseStorage, `${directory}`);

  // Optionally delete the existing file first
  if (fileRef) {
    try {
      await deleteObject(fileRef);
      console.log("File Deleted");
    } catch (error) {
      console.error({ deleteFileError: error });
    }
  }

  // Return a promise that resolves when the upload is complete
  return new Promise<void>((resolve, reject) => {
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error({ uploadFileError: error });
        reject(error); // Reject the promise on error
      },
      async () => {
        try {
          const url = await getDownloadURL(fileRef);
          setUrls(url);
          resolve(); // Resolve the promise when upload is complete
        } catch (error) {
          console.error("Error getting download URL:", error);
          reject(error); // Reject the promise on error
        }
      }
    );
  });
};
