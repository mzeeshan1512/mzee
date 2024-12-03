import { format } from "date-fns";

const getDateIndependentOfTimeZone = (dateInput?: string | Date): string => {
  // If dateInput is provided, use it; otherwise, default to the current date
  const date = dateInput 
    ? typeof dateInput === "string" 
      ? new Date(dateInput) 
      : dateInput
    : new Date();

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}T00:00:00Z`;
};
const formatDate = (date: any, dateFormat: string) => {
  return format(date, dateFormat);
};

const getValidDateValue = (start: any, end: any) => {
  let s = start;
  let e = end;
  if (start) {
    if (typeof start === "object" && start?.hasOwnProperty("date")) {
      s = formatDate(start?.date, start?.format);
    } else {
      s = new Date(start);
    }
  }
  if (end) {
    if (typeof end === "object" && end?.hasOwnProperty("date")) {
      e = formatDate(end?.date, end?.format);
    } else e = new Date(e);
  }
  return {
    s,
    e,
  };
};

const dateToParsed = (
  dateToBeParsed:
    | string
    | {
        date: string;
        format: string;
      }
) => {
  if (typeof dateToBeParsed === "object") {
    if (dateToBeParsed?.date === "") {
      return "Present";
    }
    return formatDate(dateToBeParsed?.date, dateToBeParsed?.format);
  }
  if (dateToBeParsed === "") {
    return "Present";
  }
  return new Date(dateToBeParsed)?.toDateString();
};

const getDateFromMilliseconds = (timestamp?: any) => {
  const milliseconds =
    timestamp?.seconds * 1000 + Math.floor(timestamp?.nanoseconds / 1e6);
  const newDate = new Date(milliseconds);
  return `${newDate.toDateString()}, ${newDate.toLocaleTimeString()}`;
};

const getDateTimeString = (dateTime: any) => {
  const date = new Date(dateTime);
  return `${date?.toDateString()} - ${date?.toTimeString()}`;
};

const gradients = {
  morning: "linear-gradient(45deg, #FFD700, #FF8C00)", // Gold to Dark Orange
  afternoon: "linear-gradient(45deg, #ADD8E6, #1E90FF)", // Light Blue to Dodger Blue
  evening: "linear-gradient(45deg, #FF6347, #FF4500)", // Tomato to Orange Red
  night: "linear-gradient(45deg, #2F4F4F, #00008B)", // Dark Slate Gray to Dark Blue
}

const getGreetingAndDateTime=(showSeconds?:boolean)=> {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const optionsDate:any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = now.toLocaleDateString(undefined, optionsDate);

  let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  if(showSeconds){
    formattedTime +=`:${seconds.toString().padStart(2, '0')}`
  }

  // Determine greeting
  let greeting,color;
  if (hours < 6) {
    greeting = 'Good Night';
    color = gradients.night
  } else if (hours < 12) {
    greeting = 'Good Morning';
    color = gradients.morning
  } else if (hours < 18) {
    greeting = 'Good Afternoon';
    color = gradients.afternoon
  } else {
    greeting = 'Good Evening';
    color = gradients.evening
  }

  return { greeting, date: formattedDate, time: formattedTime, color };
}

export {
    dateToParsed,
    formatDate, 
    getDateFromMilliseconds, 
    getDateTimeString, 
    getValidDateValue,
    getGreetingAndDateTime,
    getDateIndependentOfTimeZone
}