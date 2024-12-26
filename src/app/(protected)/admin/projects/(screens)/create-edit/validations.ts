"use client";
import * as yup from "yup";
import { StringError } from "@/shared/constants/regex";

const basicInfoSchema = yup.object().shape({
  /* required */
  title: yup.string().typeError(StringError).required("Title is required"),
  tech_stack: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().required("Label is required"),
        value: yup.mixed().required("Value is required")
      })
    )
    .required("Tech stack is required"),
  unique_identifier: yup
    .string()
    .typeError(StringError)
    .required("Unique identifier is required"),
  project_category: yup.object().required("Project Category is required"),
  description: yup
    .string()
    .typeError(StringError)
    .required("Project Description is required")
    .min(50, "Description must contain atleast 50 characters")
    .max(400, "Description must not exceed 400 characters"),
  /* prefilled */
  my_role: yup.string().nullable(),
  github_url: yup.string().url().nullable(),
  web_preview: yup.boolean(),
  is_featured: yup.boolean(),
  /* optional */
  content_ownership: yup.string().nullable(),
  content_ownership_link: yup
    .string()
    .test(
      "credit-link",
      "Credit link is required when credit has a value",
      function (value, context) {
        const { parent }: any = context;
        const credit: any = parent.content_ownership;
        if (credit && credit.length > 0 && !value) {
          return false;
        }
        return true;
      }
    )
    .url()
    .nullable(),
  demo_link: yup.string().url().nullable(),
  disable_demo: yup.boolean()
});

export const fileType = (value: any, type = "image") => {
  if (!value) return false; // Accept if no file is provided
  return value && value?.src && value?.src?.type?.includes(type);
};

export const sizeValidation = (
  value: any,
  size: number = 5 /* 5MB limit */
) => {
  if (!value) return false; // Reject if no file is provided
  if (value?.src?.url) {
    return true;
  }
  const s = size * 1024 * 1024;
  return value && value?.src && value?.src?.size <= s;
};

const imageGallerySchema = yup.object().shape({
  banner_image: yup
    .mixed()
    .required("Banner image is required.")
    .test(
      "fileType",
      "Invalid file type. Only png,jpg,jpeg,gif,svgs are allowed.",
      (value) => fileType(value)
    )
    .test("fileSize", "File size exceeds 5MB limit.", (value) =>
      sizeValidation(value)
    ),
  slider_images: yup
    .array()
    .of(
      yup
        .mixed()
        .test(
          "fileType",
          "Invalid file type. Only png, jpg, jpeg, gif, svgs are allowed.",
          (value: any) => {
            if (!value) return true;
            return fileType(value);
          }
        )
        .test("fileSize", "File size exceeds 5MB limit.", (value: any) => {
          if (!value) return true;
          return sizeValidation(value);
        })
    )
    .nullable()
    //.required("Slider image(s) is required.")
    //.min(1, "At least one slider image is required.")
    .max(10, "You can upload up to 10 slider images.")
});

const videoGallerySchema = yup.object().shape({
  banner_video: yup
    .mixed()
    .test(
      "fileType",
      "Invalid file type. Only mp4, avi, mkv, mov are allowed.",
      (value: any) => {
        if (!value) return true;
        return fileType(value, "video");
      }
    )
    .test("fileSize", "Banner video size exceeds 10MB limit.", (value: any) => {
      if (!value) return true;
      return sizeValidation(value, 10);
    })
    .nullable(),
  demo_video: yup
    .mixed()
    .test(
      "fileType",
      "Invalid file type. Only mp4, avi, mkv, mov are allowed.",
      (value: any) => {
        if (!value) return true;
        return fileType(value, "video");
      }
    )
    .test("fileSize", "Demo video size exceeds 10MB limit.", (value: any) => {
      if (!value) return true;
      return sizeValidation(value, 10);
    })
    .nullable()
});

export { basicInfoSchema, imageGallerySchema, videoGallerySchema };
