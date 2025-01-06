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
    (value) => (!value ? "Name is required." : null),

    (value) => (value.length < 3 ? "Name must be at least 3 characters." : null)
  ],
  designation: [
    (value) => (!value ? "Designation is required." : null),

    (value) =>
      value.length < 3 ? "Designation must be at least 3 characters." : null
  ],
  organization: [
    (value) => (!value ? "Organization is required." : null),
    (value) =>
      value.length < 3 ? "Organization must be at least 3 characters." : null
  ],
  x_collab: [
    (value) => (!value ? "Teamup/Colab is required." : null),
    (value) =>
      value.length < 5 ? "Teamup/Colab must be at least 5 characters." : null
  ],
  linked_profile: [
    (value) => (!value ? "Linkedin Profile Link is required." : null),
    (value) => {
      try {
        const url = new URL(value);
        if (!url.href.startsWith("https://www.linkedin.com/in/")) {
          return "URL must be a LinkedIn profile link (https://www.linkedin.com/in/).";
        }
        const profileSegment = url.href.replace(
          "https://www.linkedin.com/in/",
          ""
        );
        console.log({ profileSegment });
        if (!profileSegment) {
          return "The LinkedIn profile segment is empty.";
        }
        return null;
      } catch {
        return "Invalid URL format.";
      }
    }
  ],
  review: [
    (value) => (!value ? "Review is required." : null),
    (value) =>
      value.length < 50 ? "Review must be at least 50 characters." : null,
    (value) =>
      value.length > 400
        ? "Review must not exceed more than 400 characters. i.e.(white spaces also consider as character)"
        : null
  ],
  policy_agreed: [
    (value) => (!value ? "Please acknowledge and agree to the policy." : null)
  ]
};

export { validateField, validationSchema };

export type { ValidationFunction, ValidationSchema };
