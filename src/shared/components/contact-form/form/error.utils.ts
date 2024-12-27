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

const invalidFormEnteries = [
  process.env.NEXT_PUBLIC_EMAIL,
  process.env.NEXT_PUBLIC_WHATSAPP,
  process.env.NEXT_PUBLIC_LINKEDIN,
  process.env.NEXT_PUBLIC_GITHUB
];

const parseInvalidEnteries = (value: string): string | null => {
  return invalidFormEnteries?.includes(value) ? "Invalid entery" : null;
};

const validationSchema: ValidationSchema = {
  name: [
    (value) => (!value ? "Name is required" : null),
    (value) => (value.length < 3 ? "Name must be at least 3 characters" : null),
    (value) => parseInvalidEnteries(value)
  ],
  email: [
    (value) => (!value ? "Email is required" : null),
    (value) => parseInvalidEnteries(value),
    (value) =>
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
      value === process.env.NEXT_PUBLIC_EMAIL
        ? "Email is not valid"
        : null
  ],
  contact: [
    (value) => (!value ? "Contact is required" : null),
    (value) => parseInvalidEnteries(value),
    (value) =>
      !/^\+?[1-9]\d{1,14}$/.test(value) ||
      value === process.env.NEXT_PUBLIC_WHATSAPP
        ? "Contact must be a valid phone number"
        : null
  ],
  message: [
    (value) => (!value ? "Message is required" : null),
    (value) => parseInvalidEnteries(value),
    (value) =>
      value.length < 10 ? "Message must be at least 10 characters" : null
  ],
  subject: [
    (value) => (!value ? "Subject is required" : null),
    (value) => parseInvalidEnteries(value),
    (value) =>
      value.length < 5 ? "Subject must be at least 5 characters" : null
  ]
};

export {
    validateField,
    validationSchema
}

export type{
    ValidationFunction,
    ValidationSchema
}