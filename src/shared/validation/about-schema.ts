"use client"
import * as yup from "yup";
import { StringError } from "@/shared/constants/regex";
import { getValidDateValue } from "@/shared/utils/date";
import { CollectionIDs } from "../constants/collection-ids";

// const commonValidation = {
//   currently: yup.boolean(),
//   start_date: yup
//     .mixed()
//     .test(
//       "startBeforeEnd",
//       "Starting date/year must be before ending date/year",
//       function (obj: any) {
//         const { end_date, currently }: any = this.parent;
//         const { s, e } = getValidDateValue(obj, end_date);
//         if (!s) {
//           return false;
//         }
//         if (s && e && !currently) {
//           return s < e;
//         }
//         return true;
//       }
//     )
//     .required("Start date/year is required"),
//   end_date: yup
//     .mixed()
//     .test(
//       "endAfterStart",
//       "Ending date/year must be after starting date/year",
//       function (obj: any) {
//         const start = this.parent.start_date;
//         const currentlyWorking = this.parent.currently;
//         if (!currentlyWorking) {
//           const { s, e } = getValidDateValue(start, obj);
//           if (!e) {
//             return false;
//           }
//           if (s) {
//             return s < e;
//           }
//         }
//         return true;
//       }
//     )
//     .required("End date/year is required"),
// };

const commonValidation = {
  currently: yup.boolean(),

  start_date: yup
    .mixed()
    .test(
      "startBeforeEnd",
      "Starting date/year must be before ending date/year",
      function (start_date: any) {
        const { end_date, currently } = this.parent;

        // Ensure dates are valid
        const { s, e } = getValidDateValue(start_date, end_date);
        if (!s) return false; // Start date must be valid
        if (currently) return true; // Skip comparison if currently working
        if (s && e) return s < e; // Start must be before end

        return true; // Default pass
      }
    )
    .required("Start date/year is required"),

  end_date: yup
    .mixed()
    .test(
      "endAfterStart",
      "Ending date/year must be after starting date/year",
      function (end_date: any) {
        const { start_date, currently } = this.parent;

        // Ensure dates are valid
        const { s, e } = getValidDateValue(start_date, end_date);
        if (!e) return false; // End date must be valid
        if (currently) return true; // Skip comparison if currently working
        if (s && e) return s < e; // End must be after start

        return true; // Default pass
      }
    )
    .required("End date/year is required"),
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
  link: yup
    .string()
    .url()
    .typeError(StringError)
    .required("Organization web-link is required."),
  ...commonValidation,
});

// main skills
const mainSkillsField = {
  title: yup
    .string()
    .typeError(StringError)
    .required("Title is required.")
    .min(3, "Title must contain atleast 3 characters"),
  category: yup.object().required("Category is required"),
  skills: yup.array().nullable(),
};

const MainSkillsArrayValidation = yup.object().shape({
  [`${CollectionIDs.skills}`]: yup.array().of(
    yup.object().shape({
      ...mainSkillsField,
    })
  ),
});

const MainSkillsValidation = yup.object().shape({
  ...mainSkillsField,
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
  ...commonValidation,
};
const EducationValidation = yup.object().shape({
  ...eductionField,
});

const EducationArrayValidation = yup.object().shape({
  [`${CollectionIDs.education}`]: yup.array().of(
    yup.object().shape({
      ...eductionField,
    })
  ),
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
  ...commonValidation,
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
  ...commonValidation,
};
const TrainingsValidation = yup.object().shape({
  ...trainingField,
});

const TrainingsArrayValidation = yup.object().shape({
  [`${CollectionIDs.training}`]: yup.array().of(
    yup.object().shape({
      ...trainingField,
    })
  ),
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
  skills_loop: yup.array().nullable(),
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
