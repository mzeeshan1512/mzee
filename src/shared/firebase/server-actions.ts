import {
  Query,
  CollectionReference,
  where,
  orderBy,
  collection,
  getDocs,
  WhereFilterOp,
  query,
  limit,
  or,
  and,
  getCountFromServer
} from "firebase/firestore";
import { AboutPageColllectionIds, CollectionIDs } from "./collection-ids";
import { fireStore as fireStoreDB } from "./config";

export type orderByField = { field: string; direction?: "asc" | "desc" };
export type filtersParams = {
  field: string;
  operator: WhereFilterOp;
  value: any;
  functionConjection?: "and" | "or";
};

export type firebaseCondition = {
  filters?: filtersParams[];
  filterConjuctions?: "and" | "or";
  orderByFields?: orderByField | orderByField[];
  limit?: number;
  excludeFields?: string[];
};

export type arguments = {
  collectionId: CollectionIDs | AboutPageColllectionIds;
  conditions?: firebaseCondition;
  documentId?: string;
  isSingleRecord?: boolean;
  groupedData?:
    | {
        customGroupedCallBack: (
          obj: Record<string, any>,
          item: Record<string, any>
        ) => any;
        groupByField?: never;
        groupedCallBackFn?: never;
      }
    | {
        groupByField: string;
        groupedCallBackFn: (data: any) => any;
        customGroupedCallBack?: never;
      }
    | null;
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

  const filters: filtersParams[] = [
    { field: "is_archived", operator: "==", value: false },
    ...(conditions?.filters ?? [])
  ];

  const orderByConditions: orderByField | orderByField[] =
    conditions?.orderByFields ?? {
      field: "modified_at",
      direction: "desc"
    };

  // Apply filters
  if (filters) {
    filters?.forEach((filter) => {
      let value: any = where(filter?.field, filter?.operator, filter?.value);
      if (filter.functionConjection) {
        const conjuction = filter.functionConjection === "and" ? and : or;
        value = conjuction(value);
      }
      queryConstraints.push(value);
    });
  }

  // Apply ordering
  if (orderByConditions) {
    if (Array.isArray(orderByConditions)) {
      orderByConditions?.forEach((orderByConditions) =>
        queryConstraints?.push(
          orderBy(orderByConditions?.field, orderByConditions?.direction)
        )
      );
    } else
      queryConstraints?.push(
        orderBy(orderByConditions?.field, orderByConditions?.direction)
      );
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
    ...[
      "edited_by",
      "modified_at",
      "is_archived",
      "created_by",
      "created_at",
      "userID",
      "user_id",
      "userId"
    ]
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
  let data: any = [];
  let totalRecrods: number = 5;
  return {
    // getDocumentById: async (args: arguments) => {},
    getDocsCount: async (
      collectionId: CollectionIDs | AboutPageColllectionIds
    ) => {
      try {
        loading = true;
        const collectionRef = collection(fireStoreDB, collectionId);
        const snapshot = await getCountFromServer(collectionRef);
        totalRecrods = snapshot.data().count;
      } catch (err) {
        error = err;
        console.error({ countError: err });
      } finally {
        loading = false;
      }
    },
    getDocuments: async (args: arguments) => {
      try {
        loading = true;
        const collectionRef = collection(fireStoreDB, args.collectionId);
        const queryString = buildFirestoreQuery(
          collectionRef,
          args?.conditions!
        );
        const snapshot = await getDocs(queryString);
        if (snapshot && !snapshot.empty) {
          data = args?.groupedData!
            ? args.groupedData.groupedCallBackFn! ||
              args.groupedData.customGroupedCallBack!
              ? {}
              : []
            : [];
          totalRecrods = snapshot.size;
          snapshot.forEach((doc) => {
            const cleanData: Record<string, any> = {
              ...getCleanData(doc?.data(), args.conditions?.excludeFields),
              id: doc?.id
            };
            if (args.groupedData?.customGroupedCallBack) {
              data = args.groupedData?.customGroupedCallBack?.(data, cleanData);
            } else if (args?.groupedData?.groupByField) {
              const key = cleanData[args?.groupedData?.groupByField!];
              if (!data[`${key}`]) {
                data[`${key}`] = [];
              }
              data[`${key}`].push(cleanData);
            } else data.push(cleanData);
          });
          if (args.groupedData?.groupedCallBackFn) {
            data = args.groupedData?.groupedCallBackFn?.(data);
          }
          if (args.isSingleRecord) {
            data = data?.[0];
          }
        } else {
          throw new Error("No Data Found");
        }
      } catch (err) {
        error = err;
        console.error({ recordsError: err });
      } finally {
        loading = false;
      }
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
