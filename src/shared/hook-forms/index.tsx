import React from "react";
import dynamic from "next/dynamic";
import { HookFormProps } from "../types/fields";

// const FileUploaderForm = dynamic(() => import("./field-form"));
const FieldArrayForm = dynamic(() => import("./field-array-form"));
const AllInOneForm = dynamic(() => import("./all-in-one-form"));
const FieldForm = dynamic(() => import("./field-form"));

const Form = (
  props: HookFormProps & {
    validationSchema?: any;
  }
) => {
  const isAnyFileField = () => {
    const list: any = props?.fieldsList;
    const ifFileField = (array: any) =>
      array?.some((item: any) => item?.type === "file");
    return Array.isArray(list)
      ? ifFileField(list)
      : Object.keys(list)?.some((key: any) => ifFileField(list[key]));
  };
  let FormComponent = FieldForm;
  if (props?.formType === "field-array-form") {
    FormComponent = FieldArrayForm;
  } else if (props?.formType === "file-uploader-form" || isAnyFileField()) {
    FormComponent = FieldForm;
  } else if (props?.formType === "tabular-form" || props?.isDynamicForm) {
    FormComponent = AllInOneForm;
  }

  return <FormComponent {...props} />;
};

export default React.memo(Form);

export type {
  HookFormProps
}