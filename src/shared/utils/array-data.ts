// refer g-drive for searching in any typeof array
// https://drive.google.com/file/d/17pa9Bm19tI5NwASkag_YNQls96gMVQU9/view?usp=sharing for dynamic search function

import { formFieldsList, formListObject } from "../types/fields";

const searchArray = (array: GenericObject[], searchValue: any) => {
  const searchInObject: any = (obj: GenericObject) => {
    return Object?.values(obj)?.some((value) => {
      if (typeof value === "object" && value !== null) {
        return searchInObject(value);
      }
      return value?.toString()?.includes(searchValue) || value === searchValue;
    });
  };

  return array?.filter((obj) => searchInObject(obj));
};

const sortArrayByKey = (
  array: GenericObject[],
  key: string | number
): GenericObject[] => {
  return array.sort((a, b) => {
    if (a[`${key}`] < b[`${key}`]) {
      return -1;
    }
    if (a[`${key}`] > b[`${key}`]) {
      return 1;
    }
    return 0;
  });
};

const exportToJson = (data: GenericObject[], name: string = "Json-Export") => {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document?.createElement("a");
  a.href = url;
  a.download = `${name}-${new Date().toDateString()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const getDataKeyObjectFromArray = (
  fields: formListObject | formFieldsList[],
  key: string
) => {
  let obj: any = {};
  let array = fields;
  if (!Array.isArray(array) && typeof array === "object") {
    array = Object.values(fields);
    array = array?.flat(array?.length);
  }
  array?.map((item: any) => {
    if (item.options || item.multiple) {
      /* if (item.isMulti) obj[item[key]] = item?.value || null;
      else */ obj[item[key]] = item?.value || null;
    } else if (item?.type === "switch" || item?.type === "check"  || item?.type === "radio") {
      obj[item[key]] = item?.checked || false;
    } else obj[item[key]] = item?.value || "";
  });
  return obj;
};

export { searchArray, sortArrayByKey, exportToJson, getDataKeyObjectFromArray };
