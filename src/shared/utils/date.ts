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
  | 'MM-DD-YYYY'
  | 'MMM-DD-YYYY';

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const formatDate =(
  date: Date | string | number,
  format: DateFormat = "MMM-DD-YYYY",
): string =>{
  const d =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;

  const year = d?.getFullYear();
  const month = String(d?.getMonth() + 1)?.padStart(2, '0');
  const monthShort = MONTHS_SHORT[d?.getMonth()];
  const day = String(d?.getDate())?.padStart(2, '0');
  let formattedDate:string  = format;

  if (formattedDate?.includes('MMM')) {
   formattedDate = formattedDate?.replace('MMM', monthShort);
  } else {
    formattedDate = formattedDate?.replace('MM', month);
  }

  formattedDate = formattedDate
    ?.replace('YYYY', String(year))
    ?.replace('DD', day);

  return formattedDate;
}

const convertToDate = (dateString: string): Date => {
  const months: { [key: string]: number } = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };

  const [monthPart, yearStr] = dateString.split('-');
  const month = !isNaN(Number(monthPart))
    ? parseInt(monthPart, 10) - 1
    : months[monthPart];
  const year = parseInt(yearStr, 10);

  if (month === undefined || isNaN(year) || month < 0 || month > 11) {
    throw new Error('Invalid date string format. Expected format: "Jan-2023" or "01-2023"');
  }

  return new Date(year, month, 1);
};


export {
  currentRegionDate,
  convertToRegionTime,
  formatDate,
  convertToDate,
  MONTHS_SHORT
};

export type {
  DateFormat,
}
