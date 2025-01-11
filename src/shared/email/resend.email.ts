"use server";

import { Resend } from "resend";
import { EmailPayload } from ".";

export const sendEmailUsingResend = async ({
  payload,
  subject,
  textMessage
}: EmailPayload) => {
  try {
    debugger;
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_EMAIL_API_KEY);
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.NEXT_PUBLIC_RESEND_EMAIL!,
      subject: subject,
      html: `
    <div
        style="
            background: linear-gradient(
            151deg,
            rgba(36, 33, 0, 0.7512254901960784) 0%,
            rgba(121, 101, 9, 0.6391806722689075) 35%,
            rgba(249, 0, 77, 0.499124649859944) 100%
            );
            height: auto;
            padding: 20px;
        "
        >
        <div
            style="
            margin: auto auto;
            min-height: 200px;
            color: white;
            border-radius: 5px;
            background: rgba(0, 0, 0, 0.4);
            padding: 20px;
            box-shadow: rgba(255, 255, 255, 0.24) 0px 3px 8px;
            "
        >
            <div style="margin: auto auto; text-align: center">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/mzee-2f9da.appspot.com/o/logos%2FappLogo.png?alt=media&token=65997a44-c60d-47f1-88f4-8d3f72a29a7c"
                    width="180px"
                />
                </div>
                <div>
                    <h1 style="color:white">Hi <b>M. Zee</b>,</h1>

                    <h3 style="color:white">${textMessage}</h3>

                     ${Object.keys(payload)
                       .map((key: string) => `<p>${key}: ${payload[key]}</p>`)
                       .join("")}
            </div>
        </div>
    </div>
    `
    });
  } catch (error) {
    console.error("resend-error", { error });
  }
};
