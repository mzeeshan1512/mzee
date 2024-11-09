import { cookiesName } from "@/routes";
import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

const getHtmlStringFromObject = (obj: { [key: string]: any }): string => {
  let htmlString = "";
  for (let key in obj) {
    if (obj?.hasOwnProperty(key)) {
      htmlString += `${key}: ${obj[key]}

            `;
    }
  }
  return htmlString;
};

const getSafeArrayValue = (
  array: any,
  index: number,
  defaultValue: any = null
) => {
  return Array.isArray(array) && array?.length > index
    ? array[index]
    : defaultValue;
};

const getUserInfo = () => {
  const accessToken = getCookie(cookiesName?.accessToken);
  let userInfo: any = null;
  if (accessToken) {
    userInfo = jwtDecode(accessToken);
  }
  return userInfo;
};

const getUserLogOut =()=>{
  deleteCookie(cookiesName.accessToken);
  deleteCookie(cookiesName.info);
  deleteCookie("sy1h");
}

const getBase64=(file: File)=> {
  return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
  })
}

export {
  getHtmlStringFromObject,
  getSafeArrayValue,
  getUserInfo,
  getBase64,
  getUserLogOut
};
