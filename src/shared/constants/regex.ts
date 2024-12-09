// eslint-disable-next-line

import { DateFormat } from "../types/fields";

//const contactRegex: any = "^[+]{1}(?:[0-9-() /.]s?){6,15}[0-9]{1}$";
const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const contactRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const StringError = "Must be a string";
const NumberError = "Must be a valid number";

const monthsShort = "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)";
const twoDigitDay = "(0[1-9]|[12][0-9]|3[01])";
const twoDigitMonth = "(0[1-9]|1[0-2])";
const fourDigitYear = "\\d{4}";

const createErrorMessage = (format: DateFormat) =>
  `Invalid format. Expected '${format}' (e.g., '${getExample(format)}').`;

const getExample = (format: DateFormat) => {
  const examples: Record<DateFormat, string> = {
    YYYY: "2024",
    "MM-YYYY": "12-2024",
    "MMM-YYYY": "Dec-2024",
    "YYYY-MM": "2024-12",
    "YYYY-MMM": "2024-Dec",
    "YYYY-MM-DD": "2024-12-25",
    "YYYY-MMM-DD": "2024-Dec-25",
    "DD/MM/YYYY": "25/12/2024",
    "DD/MMM/YYYY": "25/Dec/2024",
    "MM-DD-YYYY": "12-25-2024",
    "MMM-DD-YYYY": "Dec-25-2024",
    "YYYY/MM": "2024/12",
    "YYYY/MMM": "2024/Dec",
    "MM/YYYY": "12/2024",
    "MMM/YYYY": "Dec/2024"
  };
  return examples[format] || format;
};

const dateFormatsMatcher: Record<
  DateFormat,
  { pattern: RegExp; errorMessage: string }
> = {
  YYYY: {
    pattern: new RegExp(`^${fourDigitYear}$`),
    errorMessage: createErrorMessage("YYYY")
  },
  "MM-YYYY": {
    pattern: new RegExp(`^${twoDigitMonth}-${fourDigitYear}$`),
    errorMessage: createErrorMessage("MM-YYYY")
  },
  "MMM-YYYY": {
    pattern: new RegExp(`^${monthsShort}-${fourDigitYear}$`),
    errorMessage: createErrorMessage("MMM-YYYY")
  },
  "YYYY-MM": {
    pattern: new RegExp(`^${fourDigitYear}-${twoDigitMonth}$`),
    errorMessage: createErrorMessage("YYYY-MM")
  },
  "YYYY-MMM": {
    pattern: new RegExp(`^${fourDigitYear}-${monthsShort}$`),
    errorMessage: createErrorMessage("YYYY-MMM")
  },
  "YYYY-MM-DD": {
    pattern: new RegExp(`^${fourDigitYear}-${twoDigitMonth}-${twoDigitDay}$`),
    errorMessage: createErrorMessage("YYYY-MM-DD")
  },
  "YYYY-MMM-DD": {
    pattern: new RegExp(`^${fourDigitYear}-${monthsShort}-${twoDigitDay}$`),
    errorMessage: createErrorMessage("YYYY-MMM-DD")
  },
  "DD/MM/YYYY": {
    pattern: new RegExp(`^${twoDigitDay}/${twoDigitMonth}/${fourDigitYear}$`),
    errorMessage: createErrorMessage("DD/MM/YYYY")
  },
  "DD/MMM/YYYY": {
    pattern: new RegExp(`^${twoDigitDay}/${monthsShort}/${fourDigitYear}$`),
    errorMessage: createErrorMessage("DD/MMM/YYYY")
  },
  "MM-DD-YYYY": {
    pattern: new RegExp(`^${twoDigitMonth}-${twoDigitDay}-${fourDigitYear}$`),
    errorMessage: createErrorMessage("MM-DD-YYYY")
  },
  "MMM-DD-YYYY": {
    pattern: new RegExp(`^${monthsShort}-${twoDigitDay}-${fourDigitYear}$`),
    errorMessage: createErrorMessage("MMM-DD-YYYY")
  },
  "YYYY/MM": {
    pattern: new RegExp(`^${fourDigitYear}/${twoDigitMonth}$`),
    errorMessage: createErrorMessage("YYYY/MM")
  },
  "YYYY/MMM": {
    pattern: new RegExp(`^${fourDigitYear}/${monthsShort}$`),
    errorMessage: createErrorMessage("YYYY/MMM")
  },
  "MM/YYYY": {
    pattern: new RegExp(`^${twoDigitMonth}/${fourDigitYear}$`),
    errorMessage: createErrorMessage("MM/YYYY")
  },
  "MMM/YYYY": {
    pattern: new RegExp(`^${monthsShort}/${fourDigitYear}$`),
    errorMessage: createErrorMessage("MMM/YYYY")
  }
};

const validateDateFormat = (
  date: string,
  format: DateFormat
):   { pattern: RegExp; errorMessage: string } | null => {
  const { pattern, errorMessage } = dateFormatsMatcher[format];
  if (!pattern?.test(date)) {
    return {errorMessage, pattern};
  }
  return null;
};

export {
  NumberError,
  StringError,
  contactRegex,
  emailRegex,
  passwordRegex,
  dateFormatsMatcher,
  validateDateFormat
};