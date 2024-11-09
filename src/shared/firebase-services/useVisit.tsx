import emailjs from "emailjs-com";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { fireStore, firebaseApp } from "@/shared/config/firebase";
import { CollectionIDs } from "@/shared/constants/collection-ids";
import { getHtmlStringFromObject } from "../utils/common";
import { deleteCookie, getCookie } from "cookies-next";
import { cookiesName } from "@/routes";

type mode= "login" | "weblogs" 

const getRecord = async (colId: any, ip: any) => {
  const documents: any = [];
  const q = query(collection(fireStore, colId), where(`ip`, "==", ip));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data(), id: doc.id });
  });
  return documents;
};

const saveVisit = async (req: any, mode: mode = "weblogs" ) => {
  debugger;
  const serviceId: any = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID;
  const emailTemplate: any =
    process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_WEB_VISIT;
  const publicKey: any = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY;
  const currentDate: Date | any = new Date();
  const date = currentDate.toLocaleString();
  const time = currentDate.toLocaleTimeString();
  const payload: any = {
    date: date,
    time: time,
    modified_at: currentDate?.toISOString(),
    ...req,
  };
  try {
    let docs = await getRecord(
      mode==="login" ? CollectionIDs.loginLogs : CollectionIDs.webInfo,
      payload.ip
    );
    let isAlready = false;
    if (docs.length > 0) {
      docs = docs[0];
      const lastVisit: Date | any = new Date(docs?.modified_at);
      const timeDiff = (currentDate - lastVisit) / (1000 * 60);
      if (timeDiff < 60) {
        isAlready = true;
      }
    }
    if (isAlready) return;
    const db = getFirestore(firebaseApp);
    await addDoc(
      collection(db,  mode==="login" ? CollectionIDs.loginLogs : CollectionIDs.webInfo),
      payload
    );

    await emailjs.send(
      serviceId,
      emailTemplate,
      {
        message: getHtmlStringFromObject(payload),
        text:  mode==="login"
          ? "Some tries to Access Admin Panel"
          : "Some one Visit your website",
        subject: ( mode==="login"
          ? `Login Attempt`
          : "New Web Visit") + ` (${payload.hostname})`,
      },
      publicKey
    );
  } catch (e) {
   // console.log({e})
  } finally {
    deleteCookie(cookiesName.info);
  }
};

const saveLoginInfo = async (mode?:mode) => {
  let cookie: any = await getCookie(cookiesName?.info);
  cookie = cookie ? JSON?.parse(cookie) : null;
  if (cookie) {
    await saveVisit(cookie, mode);
  } else deleteCookie(cookiesName?.info);
};

export { getRecord, saveLoginInfo, saveVisit };
