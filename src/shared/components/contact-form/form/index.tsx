"use client";
import { useState, useTransition } from "react";
import emailjs from "emailjs-com";
import Button from "@/shared/components/button";
import toast from "@/shared/components/toast";
import { FloatingOutlinedInput } from "./inputs";
import { validateField, validationSchema } from "./error.utils";
import { addDoc, collection } from "firebase/firestore";
import { fireStore } from "@/shared/firebase/config";
import { CollectionIDs } from "@/shared/firebase/collection-ids";
import { convertToRegionTime } from "@/shared/utils/date";
import { getHtmlStringFromObject } from "@/shared/firebase/use-visit";

interface FormData {
  [field: string]: string | undefined;
  // name: string;
  // email: string;
  // contact: string;
  // message: string;
  // subject: string;
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
    name: "contact",
    id: "contact",
    type: "numeric",
    label: "Contact"
  },
  {
    name: "email",
    id: "email",
    type: "email",
    label: "Email",
    className: "col-span-2"
  },
  {
    name: "subject",
    id: "subject",
    type: "text",
    label: "Subject",
    className: "col-span-2"
  },
  {
    name: "message",
    id: "message",
    type: "text",
    label: "Message",
    className: "col-span-2",
    isTextBox: true
  }
];

const ContactForm = () => {
  const [formState, setFormState] = useState<FormData>({
    name: undefined,
    email: undefined,
    contact: undefined,
    message: undefined,
    subject: undefined
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isPending, startTransition] = useTransition();
  const saveData = async () => {
    try {
      const serviceId: any = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID;
      const emailTemplate: any = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE;
      const publicKey: any = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY;
      const date = new Date();
      const contactFormDta = {
        ...formState,
        is_is_archived: false,
        pak_time: convertToRegionTime(date),
        created_at: date?.toDateString(),
        modified_at: date?.toISOString()
      };
      await addDoc(
        collection(fireStore, CollectionIDs.contact),
        contactFormDta
      );
      await emailjs.send(
        serviceId,
        emailTemplate,
        {
          message: getHtmlStringFromObject(contactFormDta),
          text: "Some one submits a quote to you, Details are as follows:",
          subject: `${formState.name}, submits the contact form`
        },
        publicKey
      );
      toast.success("Your Response Has Been Recorded Successfully");
      setFormState({
        name: undefined,
        email: undefined,
        contact: undefined,
        message: undefined,
        subject: undefined
      });
    } catch (err: any) {
      toast.dismiss();
      toast.error(err?.message ?? err?.code ?? "Something went wrong");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(value, validationSchema[name] || [])
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};
    let isValid = true;
    for (const [field, validations] of Object.entries(validationSchema)) {
      const error = validateField(formState[field] as any, validations);
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
    <form
      className="grid grid-flow-row md:grid-cols-2 gap-4 items-start"
      onSubmit={handleSubmit}
    >
      {formField?.map(({ id, label, isTextBox, ...field }) => (
        <FloatingOutlinedInput
          key={id}
          inputProps={{
            ...field,
            onChange: handleChange,
            value: formState[field?.name]! ?? "",
            disabled: isPending
          }}
          textAreaProps={{
            ...field,
            onChange: handleChange as any,
            value: formState[field?.name]! ?? "",
            disabled: isPending
          }}
          label={label}
          className={field.className}
          error={errors[field?.name]}
          isInvalid={errors[field?.name] ? true : false}
          isValid={
            !errors[field?.name] && formState[field?.name] ? true : false
          }
          isTextBox={isTextBox}
        />
      ))}
      <Button
        type="submit"
        className="bg-primary-gradient hover:bg-primary-hover-gradient p-3"
        disabled={isPending}
        isLoading={isPending}
      >
        Submit Quotation
      </Button>
    </form>
  );
};

export default ContactForm;
