"use client";
import * as yup from "yup";
import { StringError } from "@/shared/constants/regex";

const basicInfoSchema = yup.object().shape({
  /* required */
  title: yup.string().typeError(StringError).required("Title is required"),
  tech_stack: yup.array().required("Tech stack is required"),
  unique_identifier: yup
    .string()
    .typeError(StringError)
    .required("Unique identifier is required"),
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
  disable_demo: yup.boolean(),
});

const fileType = (value: any, type = "image") => {
  if (!value) return false; // Accept if no file is provided
  return value && value?.src && value?.src?.type?.includes(type);
};

const sizeValidation = (value: any) => {
  if (!value) return false; // Reject if no file is provided
  if (value?.src?.url) {
    return true;
  }
  return value && value?.src && value?.src?.size <= 5 * 1024 * 1024; // 5MB limit
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
    .test("fileSize", "File size exceeds 5MB limit.", sizeValidation),
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
    ).nullable()
    //.required("Slider image(s) is required.")
    //.min(1, "At least one slider image is required.")
    .max(10, "You can upload up to 10 slider images."),
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
    .test("fileSize", "Banner video size exceeds 5MB limit.", (value: any) => {
      if (!value) return true;
      return sizeValidation(value);
    }).nullable(),
    demo_video: 
      yup
        .mixed()
        .test(
          "fileType",
          "Invalid file type. Only mp4, avi, mkv, mov are allowed.",
          (value: any) => {
            if (!value) return true;
            return fileType(value, "video");
          }
        )
        .test("fileSize", "Demo video size exceeds 5MB limit.", (value: any) => {
          if (!value) return true;
          return sizeValidation(value);
        })
    .nullable()
   
});

export { basicInfoSchema, imageGallerySchema,videoGallerySchema };
