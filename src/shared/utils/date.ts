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

export {
  currentRegionDate,
  convertToRegionTime
};
