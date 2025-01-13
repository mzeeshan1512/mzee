const isNotNullValue = <T>(
  condition: boolean | string | number | T | T[]
): boolean => {
  if (Array.isArray(condition)) {
    return condition?.length > 0;
  } else if (typeof condition === "object" && condition !== null) {
    return Object.keys(condition).length > 0;
  }
  return !!condition;
};

const getTypeOfItem = <T>(
  condition: boolean | string | number | T | T[]
): string => {
  if (Array.isArray(condition)) {
    return "array";
  }
  return typeof condition;
};

const getValidSessionItem = (
  key: string,
  clearItem: boolean = false
): string | null => {
  const session = window?.sessionStorage?.getItem(key);
  if (!["", null, undefined, "undefined", "null"]?.includes(session)) {
    if (clearItem) {
      removeSessionItem(key);
    }
    return session;
  }
  return null;
};

const removeSessionItem = (key: string): void => {
  window?.sessionStorage?.removeItem(key);
};

export enum ProjectCategoryList {
  // featured = "Featured",
  worthy = "Worthy",
  industrial = "Corporate Milestones",
  notWorthy = "Not Worthy",
  youtubeCloned = "Youtube Cloned",
  cloned = "Cloned",
  others = "Others"
}

export {
  isNotNullValue,
  getTypeOfItem,
  getValidSessionItem,
  removeSessionItem
};
