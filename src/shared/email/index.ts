import emailjs from "emailjs-com";
import { sendEmailUsingResend } from "./resend.email";

export interface EmailPayload {
  payload: Record<string, any>;
  textMessage: string;
  subject: string;
}

export const getHtmlStringFromObject = (obj: {
  [key: string]: any;
}): string => {
  let htmlString = "";
  for (let key in obj) {
    if (obj?.hasOwnProperty(key)) {
      htmlString += `${key}: ${obj[key]}

            `;
    }
  }
  return htmlString;
};

export const sendEmailUsingEmailJs = async (
  args: EmailPayload,
  onExceptionCallback: (args: EmailPayload) => void
) => {
  try {
    debugger;
    const serviceId: any = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID;
    const emailTemplate: any = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE;
    const publicKey: any = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY;
    await emailjs.send(
      serviceId,
      emailTemplate,
      {
        message: getHtmlStringFromObject(args?.payload),
        text: args?.textMessage,
        subject: args?.subject
      },
      publicKey
    );
  } catch (error) {
    console.error("EmailJs unable to send emails", { error });
    // throw new Error("EmailJs unable to send emails",)
    onExceptionCallback(args);
  }
};

export const sendEmail = async (args: EmailPayload) => {
  try {
    debugger;
    await sendEmailUsingEmailJs(args, sendEmailUsingResend);
  } catch (error) {
    console.error({ error });
  }
};
