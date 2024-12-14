import { convertToDate, DateFormat, formatDate } from "@/shared/utils/date";

const timeLineFormatData = (
  input: AboutContentDataProps[]
): ExpTimelineFormat => {
  const mappedData = input.reduce((result, item) => {
    if (item.organization && item.link) {
      result.organization = item.organization;
      result.link = item.link;
      const itemStartDate =
        typeof item?.start_date! === "string"
          ? convertToDate(item?.start_date!)
          : item?.start_date;
      const itemEndDate =
        typeof item?.end_date! === "string" && !item.currently 
          ? convertToDate(item?.end_date!)
          : item.currently ? "Present":item?.end_date;
      const resultStart =
        typeof result?.start_date! === "string"
          ? convertToDate(result?.start_date!)
          : result?.start_date;
      const resultEnd =
        typeof result?.end_date! === "string" && !result.currently 
          ? convertToDate(result?.end_date!)
          : result.currently ? "Present":result?.end_date;
      if (!result.timeLine) {
        result.timeLine = [];
      }
      if (item.title && item.start_date && item.end_date) {
        result.timeLine.push({
          title: item.title,
          start_date: itemStartDate,
          end_date: itemEndDate,
          currently:item.currently,
        });
      }
      if (!result.start_date || itemStartDate! < resultStart!) {
        result.start_date = itemStartDate;
      }
      if (
        item?.end_date === "" || item.currently||
        !result.end_date ||
        itemEndDate! >= resultEnd!
      ) {
        result.end_date = item.currently ? "Present" : itemEndDate;
      }
    }
    return result;
  }, {});
  return mappedData;
};
const groupDataByTimeLineMappedFormat = (groupedData: Record<string, any>) => {
  const mappedData = Object?.keys?.(groupedData)
    .map((item: any) => {
      if (groupedData[item]?.length > 1) {
        const temp: Record<string, any> = timeLineFormatData(groupedData[item]);
        return { ...temp };
      } else {
        const objInHand = groupedData[item][0];
        const itemStartDate =
          typeof objInHand?.start_date! === "string"
            ? convertToDate(objInHand?.start_date!)
            : objInHand?.start_date;
        const itemEndDate =
          typeof objInHand?.end_date! === "string" && !objInHand.currently
            ? convertToDate(objInHand?.end_date!)
            : objInHand.currently ? "Present":objInHand?.end_date;

        return {
          ...objInHand,
          start_date: itemStartDate,
          end_date: itemEndDate
        };
      }
    })
    // .sort((a, b) => {
    //   const startDateA: any = new Date(a?.start_date);
    //   const startDateB: any = new Date(b?.start_date);
    //   return startDateA - startDateB;
    // });
  return mappedData;
};

const getEndDate = (experience: AboutContentDataProps, format:DateFormat) => {
  if (experience?.currently || experience?.end_date?.toString() === "Present") {
    return process.env.NEXT_PUBLIC_TOGGLE_PRESENT_DATE === "true"
      ? formatDate(new Date(), format)
      : "Present";
  }
  if(typeof experience?.end_date === "string"){
    return experience.end_date
  }
  return formatDate(experience.end_date!, format);
  // return experience.end_date
};

export { getEndDate, groupDataByTimeLineMappedFormat, timeLineFormatData };
