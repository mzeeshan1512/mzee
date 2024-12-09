import { formFieldsList } from "../types/fields";

const ExperienceFieldsList: formFieldsList[] = [
  {
    type: "text",
    name: "title",
    placeholder: "Title",
    label: "Title",
    required: true,
    col: 6
  },
  {
    type: "text",
    name: "organization",
    placeholder: "Company",
    label: "Company",
    required: true,
    col: 6
  },
  {
    type: "text",
    name: "link",
    placeholder: "Company Link",
    label: "Company Link",
    // required: true,
    col: 12
  },
  {
    type: "date-time",
    name: "start_date",
    placeholder: "MMM-YYYY",
    label: "Start Date",
    col: 6,
    dateFormat: "MMM-YYYY"
  },
  {
    type: "date-time",
    name: "end_date",
    placeholder: "MMM-YYYY",
    label: "End Date",
    col: 6,
    dateFormat: "MMM-YYYY",
    watchedKey: "currently"
  },
  {
    type: "switch",
    name: "currently",
    label: "Currently working",
    col: 6,
    impactedKey: {
      key: "end_date",
      isDisabled: true
    }
  },
  {
    type: "textarea",
    name: "description",
    placeholder: "Description",
    label: "Description",
    col: 12
  }
];

const EducationFieldsList: formFieldsList[] = [
  {
    type: "text",
    name: "title",
    placeholder: "Degree",
    label: "Degree",
    required: true,
    col: 6
  },
  {
    type: "text",
    name: "organization",
    placeholder: "Institute",
    label: "Institute",
    required: true,
    col: 6
  },
  {
    type: "date-time",
    name: "start_date",
    placeholder: "YYYY",
    label: "Starting Year",
    col: 6,
    required: true,
    dateFormat: "YYYY"
  },
  {
    type: "date-time",
    name: "end_date",
    placeholder: "YYYY",
    label: "Ending Year",
    col: 6,
    required: true,
    dateFormat: "YYYY",
    watchedKey: "currently"
  },
  {
    type: "switch",
    name: "currently",
    label: "Currently attending",
    impactedKey: {
      key: "end_date",
      isDisabled: true
    }
  }
];

const CoursesAndCertifications: formFieldsList[] = [
  {
    type: "text",
    name: "title",
    label: "Course Title",
    required: true,
    col: 6
  },
  {
    type: "text",
    name: "organization",
    label: "Institute",
    required: true,
    col: 6
  },
  {
    type: "text",
    name: "prefix",
    label: "Course Prefix",
    required: true,
    col: 6,
    watchedKey: "same_as"
  },
  {
    type: "text",
    name: "platform",
    label: "Platform",
    required: true,
    col: 6
  },
  {
    type: "switch",
    name: "same_as",
    label: "Same as title",
    col: 12,
    impactedKey: {
      key: "prefix",
      fieldKey: "title",
      isDisabled: true
    }
  },
  {
    type: "text",
    name: "verificationId",
    label: "Verification Code",
    // required: true,
    col: 6
  },
  {
    type: "text",
    name: "link",
    label: "Verification Link",
    // required: true,
    col: 6
  },
  {
    type: "date-time",
    name: "start_date",
    placeholder: "MMM-YYYY",
    label: "Start Date",
    col: 6,
    dateFormat: "MMM-YYYY"
    // required: true
  },
  {
    type: "date-time",
    name: "end_date",
    placeholder: "MMM-YYYY",
    label: "End Date",
    col: 6,
    dateFormat: "MMM-YYYY"
    // required: true
  }
];

const TrainingsField: formFieldsList[] = [
  {
    type: "text",
    name: "title",
    label: "Course Title",
    required: true,
    col: 6
  },
  {
    type: "text",
    name: "organization",
    label: "Institute",
    required: true,
    col: 6
  },
  {
    type: "text",
    name: "link",
    label: "Verification Link",
    // required: true,
    col: 6
  },
  {
    type: "date-time",
    name: "start_date",
    placeholder: "MMM-YYYY",
    label: "Start Date",
    col: 6,
    dateFormat: "MMM-YYYY"
    // required: true
  },
  {
    type: "date-time",
    name: "end_date",
    placeholder: "MMM-YYYY",
    label: "End Date",
    col: 6,
    dateFormat: "MMM-YYYY"
    // required: true
  }
];

export {
  ExperienceFieldsList,
  EducationFieldsList,
  CoursesAndCertifications,
  TrainingsField
};
