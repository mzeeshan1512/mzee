const currentRegionDate = (region: string = "Asia/Karachi") => {
  const currentDate = new Date(); 
  const regionDate = new Intl.DateTimeFormat("en-US", {
    timeZone: region,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(currentDate);
  return regionDate;
};

const convertToRegionTime = (inputDate: Date| string, region: string = "Asia/Karachi") => {
  const date = typeof inputDate === "string" ? new Date(inputDate): inputDate 
  const toRegionTimeDate = new Intl.DateTimeFormat('en-US', {
    timeZone: region,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
  return toRegionTimeDate;
};

type DateFormat =
  | 'YYYY'
  | 'MM'
  | 'MMM'
  | 'DD'
  | 'DD-MM'
  | 'MM-YYYY'
  | 'MMM-YYYY'
  | 'YYYY-MM'
  | 'YYYY-MMM'
  | 'YYYY-MM-DD'
  | 'YYYY-MMM-DD'
  | 'DD/MM/YYYY'
  | 'DD/MMM/YYYY'
  | 'MM-DD-YYYY'
  | 'MMM-DD-YYYY'
  | 'YYYY/MM/DD'
  | 'YYYY/MMM/DD'
  | 'YYYY-MM-DD HH:mm'
  | 'YYYY-MMM-DD HH:mm'
  | 'YYYY-MM-DD hh:mm A'
  | 'YYYY-MMM-DD hh:mm A'
  | 'YYYY-MM-DD HH:mm:ss'
  | 'YYYY-MMM-DD HH:mm:ss'
  | 'DD/MM/YYYY HH:mm'
  | 'DD/MMM/YYYY HH:mm'
  | 'MM-DD-YYYY hh:mm A'
  | 'MMM-DD-YYYY hh:mm A';

type DateFormatOptions = {
  use24HourClock?: boolean;
  includeSeconds?: boolean;
};

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const formatDate =(
  date: Date | string | number,
  format: DateFormat = "MMM-DD-YYYY hh:mm A",
  options: DateFormatOptions = {}
): string =>{
  const timeFormatPattern = /HH|hh|mm|ss|A/;
  const containsTimeFormat = timeFormatPattern.test(format);
  const { use24HourClock = true, includeSeconds = false } = options;

  const d =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  if (isNaN(d?.getTime())) {
    throw new Error('Invalid date provided');
  }

  const year = d?.getFullYear();
  const month = String(d?.getMonth() + 1)?.padStart(2, '0');
  const monthShort = MONTHS_SHORT[d?.getMonth()];
  const day = String(d?.getDate())?.padStart(2, '0');
  const hours = use24HourClock ? d?.getHours() : d?.getHours() % 12 || 12;
  const minutes = String(d?.getMinutes())?.padStart(2, '0');
  const seconds = includeSeconds ? String(d?.getSeconds())?.padStart(2, '0') : '';
  const amPm = use24HourClock ? '' : d?.getHours() >= 12 ? 'PM' : 'AM';
  let formattedDate:string  = format;

  if (formattedDate?.includes('MMM')) {
   formattedDate = formattedDate?.replace('MMM', monthShort);
  } else {
    formattedDate = formattedDate?.replace('MM', month);
  }

  formattedDate = formattedDate
    ?.replace('YYYY', String(year))
    ?.replace('DD', day);

  if (containsTimeFormat) {
    formattedDate = formattedDate
      ?.replace('HH', String(hours)?.padStart(2, '0'))
      ?.replace('hh', String(hours)?.padStart(2, '0'))
      ?.replace('mm', minutes)
      ?.replace('ss', seconds)
      ?.replace('A', amPm);
   } 
  //else {
  //   formattedDate = formattedDate
  //     ?.replace(/HH|hh|mm|ss|A/g, '')
  //     ?.replace(/ +/g, ' ')
  //     ?.trim();
  // }
  return formattedDate;
}

export {
  currentRegionDate,
  convertToRegionTime,
  formatDate,
  MONTHS_SHORT
};

export type {
  DateFormat,
  DateFormatOptions
}
