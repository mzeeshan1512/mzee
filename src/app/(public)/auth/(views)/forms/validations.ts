import * as yup from "yup";
import {
  emailRegex,
  StringError,
  contactRegex,
  passwordRegex,
} from "@/shared/constants/regex";

const RegisterFormValidation = yup.object().shape({
  first_name: yup
    .string()
    .typeError(StringError)
    .required("First name is required.")
    .min(3, "First name should contain at-least 3 characters"),
  last_name: yup
    .string()
    .typeError(StringError)
    .required("Last name is required.")
    .min(3, "Last name should contain at-least 3 characters"),
  email: yup
    .string()
    .typeError(StringError)
    .matches(emailRegex, "Invalid email")
    .required("Email is required."),
  password: yup
    .string()
    .typeError(StringError)
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
    )
    .required("Password is required")
    .min(8, "Password must be at-least 8 characters longer")
    .max(64, "Password must not be greater than 64 character"),
  confirm_password: yup
    .string()
    .typeError(StringError)
    .oneOf([yup.ref("password")], "Confirm Passwords does not match")
    .required("Confirm Password is required"),
  contact_no: yup
    .string()
    .typeError("Must be a valid number")
    .matches(
      contactRegex,
      "Contact number must be in a valid format, e.g., +123 (456) 789-0123."
    )
    .required("Contact number is required")
    .min(9, "Contact number should contain at least 9 characters")
    .max(15, "Contact number should not exceeds more than 15 characters"),
  dob: yup.mixed().nullable(),
});

const LoginFormValidation = (is2FA: boolean) =>
  yup.object().shape({
    email: yup
      .string()
      .typeError(StringError)
      .matches(emailRegex, "Invalid email")
      .required("Email is required."),
    password: yup
      .string()
      .typeError(StringError)
      .required("Password is required"),
    _2FA: is2FA
      ? yup
          .string()
          .required("2FA is required")
          .min(6, "Invalid 2FA code")
          .max(6, "Invalid 2FA code")
      : yup
          .string()
          .test("2fa-validation", "Invalid 2FA code", function (value) {
            if (value && value?.length > 0) {
              return value?.length === 6;
            }
            return true;
          })
          .nullable(),
  });

const ForgotPasswordFormValidation = yup.object().shape({
  Email: yup
    .string()
    .typeError(StringError)
    .matches(emailRegex, "Invalid email")
    .required("Email is required."),
});

const resetFormValidation = yup.object().shape({
  password: yup
  .string()
  .typeError(StringError)
  .matches(
    passwordRegex,
    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
  )
  .required("Password is required")
  .min(8, "Password must be at-least 8 characters longer")
  .max(64, "Password must not be greater than 64 character"),
confirm_password: yup
  .string()
  .typeError(StringError)
  .oneOf([yup.ref("password")], "Confirm Passwords does not match")
  .required("Confirm Password is required"),
});


export {
  RegisterFormValidation,
  ForgotPasswordFormValidation,
  resetFormValidation,
  LoginFormValidation,
};
