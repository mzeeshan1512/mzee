"use client"
import * as yup from "yup";
import { StringError } from "@/shared/constants/regex";
import { CollectionIDs } from "../constants/collection-ids";
import {
  fileType,
  sizeValidation
} from "@/app/(protected)/admin/projects/(screens)/create-edit/validations";

const commonValidation = {
  currently: yup.boolean(),
  start_date: yup
    .mixed()
    .test(
      "startBeforeEnd",
      "Starting date/year must be before ending date/year",
      function(start_date: any) {
        const { end_date, currently }: any = this.parent;
        if (currently) {
          return true;
        }
        return start_date <= end_date;
      }
    ),
  end_date: yup
    .mixed()
    .test(
      "endAfterStart",
      "Ending date/year must be after starting date/year",
      function(end_date: any) {
        const { start_date, currently }: any = this.parent;
        if (currently) {
          return true;
        }
        return start_date <= end_date;
      }
    )
};

const ExperienceValidation = yup.object().shape({
  title: yup
    .string()
    .typeError(StringError)
    .required("Title is required.")
    .min(3, "Title must contain atleast 3 characters"),
  organization: yup
    .string()
    .typeError(StringError)
    .required("Organization name is required.")
    .min(3, "Organization name  must contain atleast 3 characters"),
  link: yup.string().url().typeError(StringError),
  // .required("Organization web-link is required."),
  ...commonValidation
});

// main skills
const mainSkillsField = {
  title: yup
    .string()
    .typeError(StringError)
    .required("Title is required.")
    .min(3, "Title must contain atleast 3 characters"),
  category: yup.object().required("Category is required"),
  skills: yup.array().nullable()
};

const MainSkillsArrayValidation = yup.object().shape({
  [`${CollectionIDs.skills}`]: yup.array().of(
    yup.object().shape({
      ...mainSkillsField
    })
  )
});

const MainSkillsValidation = yup.object().shape({
  ...mainSkillsField
});

// education
const eductionField = {
  title: yup
    .string()
    .typeError(StringError)
    .required("Degree is required.")
    .min(3, "Degree must contain atleast 3 characters"),
  organization: yup
    .string()
    .typeError(StringError)
    .required("Institution name is required.")
    .min(3, "Institution name  must contain atleast 3 characters"),
  ...commonValidation
};
const EducationValidation = yup.object().shape({
  ...eductionField
});

const EducationArrayValidation = yup.object().shape({
  [`${CollectionIDs.education}`]: yup.array().of(
    yup.object().shape({
      ...eductionField
    })
  )
});

// course
const CoursesAndCertificationsValidation = yup.object().shape({
  title: yup
    .string()
    .typeError(StringError)
    .required("Degree is required.")
    .min(3, "Degree must contain atleast 3 characters"),
  organization: yup
    .string()
    .typeError(StringError)
    .required("Institution name is required.")
    .min(3, "Institution name  must contain atleast 3 characters"),
  prefix: yup
    .string()
    .typeError(StringError)
    .required("Course Prefix is required.")
    .min(3, "Degree must contain atleast 3 characters"),
  platform: yup
    .string()
    .typeError(StringError)
    .required("Platform is required.")
    .min(3, "Platform must contain atleast 3 characters"),
  link: yup
    .string()
    .url()
    .typeError(StringError)
    .required("Verification link is required."),
  verificationId: yup
    .string()
    .typeError(StringError)
    .required("Verification code is required.")
    .min(3, "Verification code must contain atleast 3 characters"),
  ...commonValidation
});

//training
const trainingField = {
  title: yup
    .string()
    .typeError(StringError)
    .required("Degree is required.")
    .min(3, "Degree must contain atleast 3 characters"),
  organization: yup
    .string()
    .typeError(StringError)
    .required("Institution name is required.")
    .min(3, "Institution name  must contain atleast 3 characters"),
  link: yup
    .string()
    .url()
    .typeError(StringError)
    .required("Verification link is required."),
  ...commonValidation
};
const TrainingsValidation = yup.object().shape({
  ...trainingField
});

const TrainingsArrayValidation = yup.object().shape({
  [`${CollectionIDs.training}`]: yup.array().of(
    yup.object().shape({
      ...trainingField
    })
  )
});

const BioSchema = yup.object().shape({
  user_name: yup
    .string()
    .typeError(StringError)
    .required("User name is required.")
    .min(3, "User name must contain atleast 3 characters"),
  location: yup
    .string()
    .typeError(StringError)
    .required("Based-in is required.")
    .min(3, "Based-in  must contain atleast 3 characters"),
  bio: yup.string().typeError(StringError).required("Bio Detail is required."),
  user_avatar: yup
    .mixed()
    .required("Banner image is required.")
    .test(
      "fileType",
      "Invalid file type. Only png,jpg,jpeg,gif,svgs are allowed.",
      value => fileType(value)
    )
    .test("fileSize", "File size exceeds 5MB limit.", sizeValidation),
  skills_loop: yup.array().nullable()
});

export {
  ExperienceValidation,
  MainSkillsValidation,
  MainSkillsArrayValidation,
  EducationValidation,
  EducationArrayValidation,
  CoursesAndCertificationsValidation,
  TrainingsValidation,
  TrainingsArrayValidation,
  BioSchema,
};
