"use client";
import Glassmorphism from "@/shared/components/glassmorphism";
import toast from "@/shared/components/toast";
import { validateField, validationSchema } from "@/shared/form/error.utils";
import { FloatingOutlinedInput } from "@/shared/form/inputs";
import { AppIcon } from "@/shared/layouts/app-logo";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import emailjs from "emailjs-com";
import { auth, firebaseStorage, fireStore } from "@/shared/firebase/config";
import { convertToRegionTime } from "@/shared/utils/date";
import {
  decryptData,
  getHtmlStringFromObject
} from "@/shared/utils/encode-decode";
import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

interface FormData {
  [field: string]: string | undefined | null;
}

interface Errors {
  [field: string]: string | null;
}

const formField = [
  {
    name: "name",
    id: "name",
    type: "text",
    label: "Name"
  },
  {
    name: "designation",
    id: "designation",
    type: "text",
    label: "Designation"
  },
  {
    name: "organization",
    id: "organization",
    type: "text",
    label: "Organization"
  },
  {
    name: "xCollab",
    id: "xCollab ",
    type: "text",
    label: "Teamup/Colab",
    helper: "work on same team etc."
  },
  {
    name: "review",
    id: "review",
    type: "text",
    label: "Review",
    className: "md:col-span-2",
    isTextBox: true
  },
  {
    name: "avatar",
    id: "avatar",
    type: "file",
    accept: "image/*",
    className: "md:col-span-2"
  }
];

const agreedPolicy =
  "By submitting, you agree to allow to use your google profile e.g.email,name and avatar.";

const handleFileUpload = (file: any, directory: string) => {
  const fileRef = ref(firebaseStorage, `${directory}`);
  return new Promise<void>((resolve, reject) => {
    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot: any) => {},
      (error: any) => {
        console.error({ uploadFileError: error });
        reject(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(fileRef);
          resolve(url as any);
        } catch (error) {
          console.error("Error getting download URL:", error);
          reject(error);
        }
      }
    );
  });
};

const HomePage = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState<FormData>({
    name: undefined,
    designation: undefined,
    organization: undefined,
    xCollab: undefined,
    review: undefined,
    policyAgreed: null,
    avatar: null
  });
  const [errors, setErrors] = React.useState<Errors>({});
  const [isPending, startTransition] = React.useTransition();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(value, validationSchema[name] || [])
    }));
  };
  const saveData = async () => {
    toast.dismiss();
    try {
      const serviceId: any = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID;
      const emailTemplate: any = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE;
      const publicKey: any = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY;
      let req: any = getCookie("gtmth");
      deleteCookie("gtmth");
      if (req) {
        req = decryptData(req!) ?? {};
      } else req = {};
      let user: any = getCookie("access_token");
      if (user) {
        user = jwtDecode(user!);
      }
      const date = new Date();
      let emailData: any = {
        ...formData,
        ...req,
        date: new Date(),
        pak_time: convertToRegionTime(date),
        created_at: date?.toDateString(),
        modified_at: date?.toISOString()
      };

      if (user) {
        emailData.email = user?.email ?? null;
        emailData.gmailName = user?.name ?? null;
      }
      const parsedFormData = { ...emailData };
      if (formData.avatar) {
        parsedFormData.avatar = await handleFileUpload(
          formData.avatar,
          `feeback-form/${user?.user_id}`
        );
      }
      parsedFormData.fireBase_Image = user?.picture ?? null;
      parsedFormData.is_approved = false;
      await addDoc(collection(fireStore, "reviews-feedbacks"), parsedFormData);
      await emailjs.send(
        serviceId,
        emailTemplate,
        {
          message: getHtmlStringFromObject(emailData),
          text: "Some one gives you a feedback, Details are as follows:",
          subject: `${formData?.name}, submits the review or feedback form`
        },
        publicKey
      );
      deleteCookie("access_token");
      toast.success("Your Response Has Been Recorded Successfully");
      await signOut(auth);
      setFormData({
        name: undefined,
        designation: undefined,
        organization: undefined,
        xCollab: undefined,
        review: undefined,
        avatar: null
      });
      router.replace("/login");
    } catch (err: any) {
      toast.error(err?.message ?? err?.code ?? "Something went wrong");
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};
    let isValid = true;
    for (const [field, validations] of Object.entries(validationSchema)) {
      const error = validateField(formData[field] as any, validations);
      if (error) {
        isValid = false;
        newErrors[field] = error;
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors)?.length > 0) {
      return;
    }
    startTransition(() => saveData());
  };
  return (
    <Glassmorphism className="!bg-[radial-gradient(black,transparent)] grid grid-flow-row-dense md:grid-cols-2 gap-3">
      <div className="md:col-span-2 flex justify-center w-full">
        <AppIcon />
      </div>
      {formField.map((field, index) => (
        <FloatingOutlinedInput
          key={field.id + index}
          inputProps={{
            ...field,
            onChange: handleChange,
            value: formData[field?.name]! ?? "",
            disabled: isPending
          }}
          textAreaProps={{
            ...field,
            onChange: handleChange as any,
            value: formData[field?.name]! ?? "",
            disabled: isPending
          }}
          label={field?.label!}
          className={field.className}
          error={errors[field?.name]}
          isInvalid={errors[field?.name] ? true : false}
          isValid={!errors[field?.name] && formData[field?.name] ? true : false}
          isTextBox={field?.isTextBox}
          helper={field?.helper}
        />
      ))}
      <div className="md:col-span-2">
        <div className=" flex items-center">
          <input
            checked={formData.policyAgreed ? true : false}
            id="checked-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            onChange={(e: any) => {
              if (e?.target?.checked) {
                setFormData({
                  ...formData,
                  policyAgreed: `${agreedPolicy}, date:${convertToRegionTime(
                    new Date()
                  )}`
                });
              } else {
                setFormData({
                  ...formData,
                  policyAgreed: null
                });
              }
              setErrors((prev) => ({
                ...prev,
                policyAgreed: validateField(
                  e?.target?.checked,
                  validationSchema?.policyAgreed || []
                )
              }));
            }}
          />
          <label
            htmlFor="checked-checkbox"
            className="ms-2 text-sm font-medium text-gray-300"
          >
            {agreedPolicy}
          </label>
        </div>
        {errors.policyAgreed && (
          <small className="text-red-400 text-sm">{errors.policyAgreed}</small>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="bg-primary-gradient hover:bg-primary-hover-gradient p-2 rounded-lg"
          disabled={isPending}
          onClick={handleSubmit}
        >
          {isPending ? (
            <svg
              aria-hidden="true"
              className={`w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary-600 shrink-0 ${
                isPending ? "block" : "hideen"
              }`}
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </Glassmorphism>
  );
};

export default HomePage;
