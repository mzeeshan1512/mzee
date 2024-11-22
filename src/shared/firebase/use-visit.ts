import emailjs from "emailjs-com";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { deleteCookie } from "cookies-next";
import { fireStore, firebaseApp } from "./config";
import { cookiesName } from "@/shared/constants-enums/navigation-list";
import { CollectionIDs } from "./collection-ids";

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

const saveVisit = async (req: any ) => {
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
    let docs = await getRecord(CollectionIDs.webInfo ,payload.ip);
    let isAlready = false;
    if (docs.length > 0) {
      docs = docs[0];
      const lastVisit: Date | any = new Date(docs?.modified_at);
      const timeDiff = (currentDate - lastVisit) / (1000 * 60);
      if (timeDiff <= 60) {
        isAlready = true;
      }
    }
    if (isAlready) return;
    const db = getFirestore(firebaseApp);
    await addDoc(
      collection(db,  CollectionIDs.webInfo),
      payload
    );

    await emailjs.send(
      serviceId,
      emailTemplate,
      {
        message: getHtmlStringFromObject(payload),
        text:  "Some one Visit your website",
        subject: "New Web Visit" + ` (${payload.hostname}) ${date}`,
      },
      publicKey
    );
  } catch (e) {
   // console.log({e})
  } finally {
    deleteCookie(cookiesName.info);
  }
};

export { getRecord, saveVisit, getHtmlStringFromObject };