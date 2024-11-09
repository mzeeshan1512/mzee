import { formFieldsList } from "@/shared/types/fields";

const registrationForm: formFieldsList[] = [
  {
    type: "text",
    name: "first_name",
    placeholder: "First Name",
    label: "First Name",
    required: true,
    col: 6,
  },
  {
    type: "text",
    name: "last_name",
    placeholder: "Last Name",
    label: "Last Name",
    required: true,
    col: 6,
  },
  {
    type: "email",
    name: "email",
    placeholder: "example@example.com ",
    label: "Email",
    required: true,
    col: 12,
  },
  {
    type: "password",
    name: "password",
    placeholder: "*********",
    label: "Password",
    required: true,
    col: 6,
  },
  {
    type: "password",
    name: "confirm_password",
    placeholder: "*********",
    label: "Confirm Password",
    required: true,
    col: 6,
  },
  {
    type: "numeric",
    name: "contact_no",
    placeholder: "+000 0000 0000",
    label: "Contact Number",
    required: true,
    col: 6,
  },
  {
    type: "date",
    name: "dob",
    placeholder: "DD/MM/YYY",
    label: "Date of Birth",
    col: 6,
  },
];

const loginForm: formFieldsList[] = [
  {
    type: "email",
    name: "email",
    placeholder: "example@example.com ",
    label: "Email",
    required: true,
    col: 12,
  },
  {
    type: "password",
    name: "password",
    placeholder: "*********",
    label: "Password",
    required: true,
    col: 6,
  },
];

const resetForm: formFieldsList[] = [
  {
    type: "password",
    name: "password",
    placeholder: "*********",
    label: "Password",
    required: true,
    col: 12,
  },
  {
    type: "password",
    name: "confirm_password",
    placeholder: "*********",
    label: "Confirm Password",
    required: true,
    col: 12,
  },
];

export { registrationForm, loginForm, resetForm };
