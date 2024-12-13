"use client";
import * as yup from "yup";
import { StringError } from "@/shared/constants/regex";

const IconsValidation = yup.object().shape({
  title: yup
    .string()
    .typeError(StringError)
    .required("Icon Name is required.")
    .min(3, "Icon Name must contain atleast 3 characters"),
  blob: yup
    .mixed()
    .required("Icon is required.")
    .test(
      "fileType",
      "Invalid file type. Only SVG files are allowed.",
      (value: any) => {
        if (!value) return false; // Accept if no file is provided
        return value && value?.src && value?.src?.type === "image/svg+xml";
      }
    )
    .test("fileSize", "File size exceeds 2MB limit.", (value: any) => {
      if (!value) return false; // Accept if no file is provided
      return value && value?.src && value?.src?.size <= 2 * 1024 * 1024; // 2MB limit
    }),
});

const ServiceValidation = yup.object().shape({
  title: yup
    .string()
    .typeError(StringError)
    .required("Title is required.")
    .min(3, "Title must contain atleast 3 characters"),
  blob: yup.mixed().required("Icon is required."),
  description: yup
    .string()
    .typeError(StringError)
    .required("Description is required.")
    .min(10, "Description must contain atleast 10 characters")
    .max(400, "Description must not exceed 400 characters"),
});

const TechValidation = yup.object().shape({
  // title: yup
  //   .string()
  //   .typeError(StringError)
  //   .required("Title is required.")
  //   .min(3, "Title must contain atleast 3 characters"),
  category: yup
    .string()
    .typeError(StringError)
    .required("Category is required.")
    .min(3, "Category must contain atleast 3 characters"),
  blob: yup.mixed().required("Icon is required."),
});

export { IconsValidation, ServiceValidation, TechValidation };
