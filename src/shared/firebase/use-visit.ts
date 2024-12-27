import emailjs from "emailjs-com";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where
} from "firebase/firestore";
import { deleteCookie, getCookie } from "cookies-next";
import { fireStore, firebaseApp } from "./config";
import { cookiesName } from "@/shared/constants-enums/navigation-list";
import { CollectionIDs } from "./collection-ids";
import { decryptData } from "../utils/encode-decode";
import { convertToRegionTime } from "../utils/date";

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

const getRecord = async (colId: any, ip: any) => {
  const documents: any = [];
  const q = query(collection(fireStore, colId), where(`ip`, "==", ip));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data(), id: doc.id });
  });
  return documents;
};

const saveVisit = async () => {
  let req: any = getCookie(cookiesName.info);
  deleteCookie(cookiesName.info);
  if (req) {
    req = decryptData(req!);
  }
  if (req && Object.keys(req)?.length > 0) {
    const serviceId: any = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID;
    const emailTemplate: any = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE;
    const publicKey: any = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY;
    const currentDate: Date | any = new Date();
    const date = currentDate.toLocaleString();
    const time = currentDate.toLocaleTimeString();
    const payload: any = {
      date: date,
      time: time,
      modified_at: currentDate?.toISOString(),
      pakistan_time: convertToRegionTime(currentDate),
      ...req
    };

    try {
      if (payload?.ip) {
        let docs = await getRecord(CollectionIDs.webInfo, payload?.ip);
        let isAlready = false;
        if (docs?.length > 0) {
          docs = docs[0];
          const lastVisit: Date | any = new Date(docs?.modified_at);
          const timeDiff = (currentDate - lastVisit) / (1000 * 60);
          if (timeDiff <= 60) {
            isAlready = true;
          }
        }
        if (isAlready) return;
      }
      const db = getFirestore(firebaseApp);
      await addDoc(collection(db, CollectionIDs.webInfo), payload);

      await emailjs.send(
        serviceId,
        emailTemplate,
        {
          message: getHtmlStringFromObject(payload),
          text: "Some one Visit your website",
          subject: "New Web Visit" + ` (${payload.hostname})`
        },
        publicKey
      );
    } catch (error) {
      console.error({ error });
    }
  }
};

export { getRecord, saveVisit, getHtmlStringFromObject };
