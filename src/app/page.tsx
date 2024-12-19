"use client";
import Glassmorphism from "@/shared/components/glassmorphism";
import { validateField, validationSchema } from "@/shared/form/error.utils";
import { FloatingOutlinedInput } from "@/shared/form/inputs";
import { AppIcon } from "@/shared/layouts/app-logo";
import React from "react";

interface FormData {
  [field: string]: string | undefined;
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
    helper: "work on same team ets."
  },
  {
    name: "review",
    id: "review",
    type: "text",
    label: "Review",
    className: "col-span-2",
    isTextBox: true
  }
];

const HomePage = () => {
  const [formData, setFormData] = React.useState<FormData>({
    name: undefined,
    designation: undefined,
    organization: undefined,
    xCollab: undefined,
    review: undefined
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

  return (
    <Glassmorphism className="grid grid-flow-row-dense md:grid-cols-2 gap-3">
      <div className="md:col-span-2 flex justify-center w-full">
        <AppIcon />
        {formField.map((field) => (
          <FloatingOutlinedInput
            key={field.id}
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
            label={field.label}
            className={field.className}
            error={errors[field?.name]}
            isInvalid={errors[field?.name] ? true : false}
            isValid={
              !errors[field?.name] && formData[field?.name] ? true : false
            }
            isTextBox={field?.isTextBox}
          />
        ))}
      </div>
    </Glassmorphism>
  );
};

export default HomePage;
