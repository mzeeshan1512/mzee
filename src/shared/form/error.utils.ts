type ValidationFunction = (value: string) => string | null;

type ValidationSchema = {
  [field: string]: ValidationFunction[];
};

const validateField = (
  value: string,
  validations: ValidationFunction[]
): string | null => {
  for (let validation of validations) {
    const error = validation(value);
    if (error) return error;
  }
  return null;
};

const validationSchema: ValidationSchema = {
  name: [
    (value) => (!value ? "Name is required" : null),

    (value) => (value.length < 3 ? "Name must be at least 3 characters" : null)
  ],
  designation: [
    (value) => (!value ? "Designation is required" : null),

    (value) =>
      value.length < 3 ? "Designation must be at least 3 characters" : null
  ],
  organization: [
    (value) => (!value ? "Organization is required" : null),
    (value) =>
      value.length < 3 ? "Organization must be at least 3 characters" : null
  ],
  xCollab: [
    (value) => (!value ? "Teamup/Colab is required" : null),
    (value) =>
      value.length < 5 ? "Teamup/Colab must be at least 5 characters" : null
  ],
  review: [
    (value) => (!value ? "Review is required" : null),
    (value) =>
      value.length < 50 ? "Review must be at least 10 characters" : null,
    (value) =>
      value.length > 400
        ? "Review must be at exceed more than 400 characters"
        : null
  ]
};

export { validateField, validationSchema };

export type { ValidationFunction, ValidationSchema };
