import {
  Query,
  CollectionReference,
  where,
  orderBy,
  collection,
  getDocs,
  WhereFilterOp,
  query,
  limit
} from "firebase/firestore";
import { CollectionIDs } from "./collection-ids";
import { fireStore as fireStoreDB } from "./config";
import toast from "../components/toast";

export type firebaseCondition = {
  filters?: { field: string; operator: WhereFilterOp; value: any }[];
  orderByFields?: { field: string; direction?: "asc" | "desc" }[];
  limit?: number;
  excludeFields?: string[];
};

export type arguments = {
  collectionId: CollectionIDs;
  conditions?: firebaseCondition;
  documentId?: string;
};

/**
 * Builds a Firestore query with the provided conditions.
 *
 * @param collectionRef - The Firestore collection reference to query.
 * @param conditions - An object specifying query filters and options.
 * @returns The constructed Firestore query.
 */

export const buildFirestoreQuery = (
  collectionRef: CollectionReference,
  conditions: firebaseCondition
): Query => {
  const queryConstraints: any[] = [];

  // Apply filters
  if (conditions?.filters) {
    conditions?.filters?.forEach((filter) => {
      queryConstraints.push(
        where(filter?.field, filter?.operator, filter?.value)
      );
    });
  }

  // Apply ordering
  if (conditions?.orderByFields) {
    conditions?.orderByFields?.forEach((order) => {
      queryConstraints?.push(orderBy(order?.field, order?.direction));
    });
  }

  // Apply limit
  if (conditions?.limit) {
    queryConstraints?.push(limit(conditions?.limit));
  }

  return query(collectionRef, ...queryConstraints);
};

const getCleanData = (obj: Record<string, any>, excludedFields?: string[]) => {
  const cleanData = { ...obj };
  const keysToExclude = [
    ...(excludedFields ?? []),
    ...["edited_by", "modified_at", "is_archived", "created_by", "created_at:"]
  ];
  keysToExclude.forEach((key) => {
    if (key in cleanData) {
      delete cleanData[key];
    }
  });
  return cleanData;
};

export const fetchRecordsOnServer = () => {
  let loading = false;
  let error: any = null;
  let data: any;
  let totalRecrods: number = 5;
  return {
    getDocumentById: async (args: arguments) => {},
    getDocuments: async (args: arguments) => {
      loading = true;
      const collectionRef = collection(fireStoreDB, args.collectionId);
      const queryString = buildFirestoreQuery(collectionRef, args?.conditions!);
      const snapshot = await getDocs(queryString);
      if (snapshot && !snapshot.empty) {
        data = [];
        totalRecrods = snapshot.size;
        snapshot.forEach((doc) => {
          data.push({ ...getCleanData(doc?.data()), id: doc?.id });
        });
      } else {
        error = "No Data found";
        toast.dismiss();
        toast.error("No Data Found");
      }
      loading = false;
    },
    get loading() {
      return loading;
    },
    get error() {
      return error;
    },
    get data() {
      return data;
    },
    get totalRecrods() {
      return totalRecrods;
    }
  };
};
