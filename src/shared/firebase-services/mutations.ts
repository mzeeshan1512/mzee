import { useMutation, useQueryClient } from "react-query";
import {
  collection,
  addDoc,
  runTransaction,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { showError, showSuccess } from "../utils/toast";
import { fireStore } from "../config/firebase";
import { getUserInfo } from "../utils/common";

export const saveDataToFirebase = async (payload: { [key: string]: any }) => {
  const user: { [key: string]: any } = getUserInfo();
  if (!user) {
    throw new Error("UnAuthorized User");
  }
  try {
    const obj = {
      ...payload?.data,
      userId: user?.user_id,
      edited_by: user?.user_id,
      created_by: payload?.data?.created_by || user?.user_id,
      is_archived: payload?.data?.is_archived || false,
      created_at: payload?.data?.created_at || new Date()?.toISOString(),
      modified_at: new Date()?.toISOString(),
    };
    let callBackDocRef: any = "";
    if (payload?.dataId) {
      const docRef = await doc(
        fireStore,
        payload?.collectionId,
        payload?.dataId
      );
      callBackDocRef = await updateDoc(docRef, obj);
    } else {
      callBackDocRef = await addDoc(
        collection(fireStore, payload?.collectionId),
        obj
      );
    }
    if (callBackDocRef) {
      const docSnapshot = await getDoc(callBackDocRef);
      if (docSnapshot.exists()) {
        const data: any = docSnapshot.data();
        return {
          ...data,
          id: docSnapshot.id,
        };
      }
    }
  } catch (error: any) {
    debugger;
    showError(error);
    throw new Error(error!);
  }
};

export const handlePostData = async (payload: { [key: string]: any }) => {
  try {
    if (payload?.fieldArrayName) {
      const promises = payload?.data?.[`${payload.fieldArrayName!}`]?.map(
        (item: any) =>
          saveDataToFirebase({
            data: item,
            collectionId: payload?.collectionId,
            userInfo: payload?.userInfo,
          })
      );
      if (promises) {
        return await Promise.all(promises);
      }
    } else {
      return await saveDataToFirebase(payload);
    }
  } catch (error: any) {
    debugger;
    showError(error);
    throw new Error(error!);
  }
};

export const usePostData = (
  collectionId: any,
  onCallBack?: any,
  redirect: boolean = true
) => {
  const navigate = useRouter();
  const queryClient = useQueryClient();
  return useMutation(handlePostData, {
    onSuccess: (data) => {
      queryClient.refetchQueries(collectionId);
      showSuccess("Document Saved Successfully");
      if (onCallBack) {
        onCallBack(data);
      } else if (redirect) navigate.back();
    },
    onError: (_error: any) => {
      queryClient.refetchQueries(collectionId);
      showError(_error);
    },
  });
};

export const handleDataWriting = async (payload: { [key: string]: any }) => {
  try {
    await runTransaction(fireStore, async (transaction) => {
      const docRef = doc(fireStore, payload?.collectionId);
      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
    });
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
};

export const useSingletonDataPost = (collectionId: any) => {
  const queryClient = useQueryClient();
  return useMutation(handlePostData, {
    onSuccess: () => {
      queryClient.refetchQueries(collectionId);
      showSuccess("Bio Saved Successfully");
    },
    onError: (_error: any) => {
      queryClient.refetchQueries(collectionId);
      showError(_error);
    },
  });
};
