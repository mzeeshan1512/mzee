type ValidationFunction = (value: string) => string | null;

type ValidationSchema = {
  [field: string]: ValidationFunction[];
};

const validateField = (value: string, validations: ValidationFunction[]): string | null => {
  for (let validation of validations) {
    const error = validation(value);
    if (error) return error;
  }
  return null;
};

const validationSchema: ValidationSchema = {
name: [
    (value) => (!value ? "Name is required" : null),
    
    (value) =>
      value.length < 3
        ? "Name must be at least 3 characters"
        : null,
  ],
  email: [
    (value) => (!value ? "Email is required" : null),
    (value) =>
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
        ? "Email is not valid"
        : null,
  ],
  contact: [
    (value) => (!value ? "Contact is required" : null),
    (value) =>
      !/^\+?[1-9]\d{1,14}$/.test(value)
        ? "Contact must be a valid phone number"
        : null,
  ],
  message: [
    (value) => (!value ? "Message is required" : null),
    (value) =>
      value.length < 10
        ? "Message must be at least 10 characters"
        : null,
  ],
  subject: [
    (value) => (!value ? "Subject is required" : null),
    (value) =>
      value.length < 5
        ? "Subject must be at least 5 characters"
        : null,
  ],
};

export {
    validateField,
    validationSchema
}

export type{
    ValidationFunction,
    ValidationSchema
}