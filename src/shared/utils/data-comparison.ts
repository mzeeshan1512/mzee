const deepDataComparison: any = (value1: any, value2: any) => {
  if (value1 === value2) {
    return true;
  }

  if (typeof value1 !== typeof value2 || value1 === null || value2 === null) {
    return false;
  }

  if (typeof value1 === "object") {
    if (Array?.isArray(value1) !== Array?.isArray(value2)) {
      return false;
    }

    if (Array?.isArray(value1)) {
      if (value1?.length !== value2?.length) {
        return false;
      }

      return value1?.every((item, index) =>
        deepDataComparison(item, value2[index])
      );
    }

    const keys1 = Object?.keys(value1);
    const keys2 = Object?.keys(value2);

    if (keys1?.length !== keys2?.length) {
      return false;
    }

    return keys1?.every(
      (key) =>
        keys2?.includes(key) && deepDataComparison(value1[key], value2[key])
    );
  }

  return false;
};

const sortStringAlphabetically = (inputString: string) => {
  const charArray = inputString?.split("");
  const sortedArray = charArray?.sort();
  const resultString = sortedArray?.join("");
  return resultString.toString();
};

const isDataNotModified = (initialState: any, updatedState: any) => {
  const result: any =
    sortStringAlphabetically(JSON.stringify(initialState)) ===
    sortStringAlphabetically(JSON.stringify(updatedState));

  return result;
};

const getValidObjectKeysLength = (obj: any) => {
  let progressCount = 0;
  let keysCount = 0;
  if (typeof obj === "object") {
    Object?.keys(obj)?.forEach((key: any) => {
      keysCount++;
      const value = obj[key];
      let result = value !== null && value !== undefined && value !== "";
      if (Array.isArray(value)) {
        result = result && value?.length > 0;
      }
      if (result) {
        progressCount++;
      }
    });
  }
  return { progressCount, keysCount };
};

/* 
const projectProgress = useMemo(() => {
    let progress = 0;
    let totalKeys =0;
    if (projectInfo) {
      progress = Object?.keys(projectInfo)?.length - 7;
    }
    const totalSteps = Object.keys(tabIds).length;
    const percentageProgress = (progress / totalSteps) * 100;

    // Ensure that progress doesn't go negative or above 100%
    return Math.min(Math.max(percentageProgress, 0), 100)?.toFixed(2);
  }, [projectInfo]);
*/

export {
  deepDataComparison,
  sortStringAlphabetically,
  isDataNotModified,
  getValidObjectKeysLength,
};
