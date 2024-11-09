import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  Query,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { fireStore, firebaseStorage } from "@/shared/config/firebase";
import { showError, showSuccess } from "../utils/toast";
import { useRouter } from "next/navigation";

// get all documents
export const fetchCollections = (
  collectionType: string = "projects",
  order: "desc" | "asc" = "desc"
) => {
  const getRecords = async () => {
    const document: any = [];
    const q = query(
      collection(fireStore, collectionType),
      orderBy("modified_at", order || "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      document.push({ ...doc.data(), id: doc.id });
    });
    return document;
  };
  return getRecords();
};

export const useGetDocuments = (
  collectionType: string,
  order?: "desc" | "asc"
) => {
  return useQuery(
    collectionType,
    () => fetchCollections(collectionType, order),
    {
      staleTime: 20000,
      refetchInterval: 20000,
    }
  );
};

// get document by keyword
const fetchProjectsUsingKeyword = (id: string, key: string, keyword: any) => {
  const getRecord = async () => {
    const documents: any = [];
    const q = query(collection(fireStore, id), where(key, "==", keyword));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    return documents;
  };
  return getRecord();
};

export const useGetDocumentsByKeyword = (
  id: string,
  key: string,
  keyword: any
) => {
  return useQuery(
    [id, keyword, key],
    () => fetchProjectsUsingKeyword(id, key, keyword),
    {
      staleTime: 20000,
      refetchInterval: 20000,
    }
  );
};

type DeleteProps = {
  id: string;
  collectionType: string;
  key?: string;
  directory?:string[]
}
// delete document

export const deleteFilesFromFirebaseStorage = async (directory: string) => {
  const fileRef = ref(firebaseStorage, `${directory}`);
  await deleteObject(fileRef)
    .then(() => {
      console.log("File Deleted");
    })
    .catch((error: any) => {
      console.log({ deleteFileError: error });
    });
};

export const delete_Doc = async (props: DeleteProps) => {
  try {
    const docRef = await doc(fireStore, props?.collectionType, props.id);
    await deleteDoc(docRef);
  } catch (error: any) {
    throw new Error(error);
  }
};

// delete documents

export const deleteDocument = async (props:DeleteProps) => {
  try {
    if (props?.directory) {
      let promises =  props?.directory.map((item: any) => {
        return  deleteFilesFromFirebaseStorage(item);
      })
      await promises
    }

    await delete_Doc(props);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const useDeleteDocument = (collectionType: string, close = () => {}) => {
  const queryClient = useQueryClient();
  return useMutation(deleteDocument, {
    onSuccess: (data) => {
      queryClient.refetchQueries(collectionType);
      showSuccess("Document Removed Successfully");
      close();
    },
    onError: (_error, context) => {
      queryClient.refetchQueries(collectionType);
      showError(_error);
    },
  });
};

//get document by id
const getDocumentById = (collection: string, id: any) => {
  const getRecord = async () => {
    const docRef = doc(fireStore, collection, id);
    const querySnapshot = await getDoc(docRef);
    if (querySnapshot.exists()) {
      const obj: any = { ...querySnapshot.data(), id: id };
      if (obj?.is_archived) {
        showError("Archived documents could not be edited");
        throw new Error("Archived documents could not be edited");
      }
      return { ...obj };
    } else {
      throw new Error("No such document!");
    }
    //return document;
  };
  if (id) {
    return getRecord();
  }
  return null;
};

export const useGetDocument = (collection: string, id: any) => {
  const navigate = useRouter()
  return useQuery([collection, id], () => getDocumentById(collection, id), {
    onError: (err: any) => {
      navigate?.push("/404")
      showError(err);
    },
  });
};
