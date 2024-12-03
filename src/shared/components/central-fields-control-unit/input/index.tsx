import React from "react";
import dynamic from "next/dynamic";
import { FormSkeleton } from "@/shared/components/loaders-spinners/skeleton";
import { FormProps, inputType } from "@/shared/types/fields";
import FieldError from "../field-error";

const FileInput = dynamic(() => import("./file-input"), {
  ssr: false,
  loading: () => <FormSkeleton />,
});

const GeneralInput = dynamic(() => import("./general"), {
  ssr: false,
  loading: () => <FormSkeleton />,
});
const PasswordInput = dynamic(() => import("./password"), {
  ssr: false,
  loading: () => <FormSkeleton />,
});
const RadioCheckToggler = dynamic(() => import("./toggler-check-radio"), {
  ssr: false,
  loading: () => <FormSkeleton />,
});
const FormDatePicker = dynamic(() => import("./date-picker"), {
  ssr: false,
  loading: () => <FormSkeleton />,
});

const Input = React.forwardRef((props: FormProps, ref) => {
  const includedTypes: inputType[] = [
    "text",
    "email",
    "number",
    "numeric",
    "date",
    "tel"
  ];

  const type: inputType | undefined = props?.type;
  const isFloatingLabel =
    props?.floatingLabels && includedTypes?.includes(type!);
  let Component = GeneralInput;

  // handle which component to be mount
  if (type === "switch" || type === "checkbox" || type === "radio") {
    Component = RadioCheckToggler;
  }
  if (type === "password") {
    Component = PasswordInput;
  }
  if (type === "date") {
    Component = FormDatePicker;
  }
  if (type === "file") {
    Component = FileInput;
  }

  return (
    <div
      className={`d-flex flex-column gap-1 ${
        isFloatingLabel ? "custom-floating-labels" : ""
      } ${props?.formGroupClass ? props?.formGroupClass : ""}`}
    >
      <Component
        {...props}
        labelCssClass={`${props?.labelCssClass ? props?.labelCssClass : ""} ${
          isFloatingLabel ? "control-label" : ""
        }`}
        floatingLabels={isFloatingLabel}
      />
      <FieldError {...props} />
    </div>
  );
});

Input.displayName = "Input";

export default Input;
