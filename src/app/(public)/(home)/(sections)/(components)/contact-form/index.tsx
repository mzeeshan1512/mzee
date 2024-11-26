"use client";
import { useState } from "react";
import { FloatingOutlinedInput } from "./inputs";
import { validateField, validationSchema } from "./error.utils";
import Button from "@/shared/components/button";

interface FormData {
  [field: string]: string | null;
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
    name: null,
    email: null,
    contact: null,
    message: null,
    subject: null
  });
  const [errors, setErrors] = useState<Errors>({});

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
  };

  return (
    <form
      className="grid grid-flow-row md:grid-cols-2 gap-4 items-start"
      onSubmit={handleSubmit}
    >
      {formField?.map((item) => (
        <FloatingOutlinedInput
          key={item.id}
          inputProps={{
            ...item,
            onChange: handleChange,
            value: formState[item?.name]!
          }}
          label={item.label}
          className={item.className}
          error={errors[item?.name]}
          isInvalid={errors[item?.name] ? true : false}
          isValid={!errors[item?.name] && formState[item?.name] ? true : false}
          isTextBox={item?.isTextBox}
        />
      ))}
      <Button
        type="submit"
        className="bg-primary-gradient hover:bg-primary-hover-gradient p-3"
      >
        Submit Quotation
      </Button>
    </form>
  );
};

export default ContactForm;
