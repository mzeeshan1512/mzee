import { formatDate } from "@/shared/utils/date";
import { exp_data } from "./json_data_test";

 const timeLineFormatData = (input: AboutContentDataProps[]) => {
    const mappedData = input.reduce((result, item) => {
      if (item.organization && item.link) {
        result.organization = item.organization;
        result.link = item.link;
        if (!result.timeLine) {
          result.timeLine = [];
        }
        if (item.title && item.start_date && item.end_date) {
          result.timeLine.push({
            title: item.title,
            start_date: item.start_date,
            end_date:item.end_date,
          });
        }
        if (!result.start_date || new Date(item.start_date!) < new Date(result.start_date)) {
          result.start_date = item.start_date;
        }
        if (
          item?.end_date === "Present" ||
          !result.end_date ||
          new Date(item.end_date!) >= new Date(result.end_date)
        ) {
          result.end_date = item.end_date;
        }
      }
      return result;
    }, {});
    return mappedData;
  };
const groupDataByOrganization = () => {
    const organizationGroups: any | null | undefined = {};
    exp_data?.forEach((item) => {
      const timeLine = item.organization!;
      if (!organizationGroups[timeLine]) {
        organizationGroups[timeLine] = [];
      }
      organizationGroups[timeLine].push(item);
    });

    const mappedData = Object?.keys?.(organizationGroups)
      .map((item: any) => {
        if (organizationGroups[item]?.length > 1) {
          const temp: any = timeLineFormatData(organizationGroups[item]);
          return { ...temp };
        } else {
          return { ...organizationGroups[item][0] };
        }
      })
      .sort((a, b) => {
        const startDateA: any = new Date(a?.start);
        const startDateB: any = new Date(b?.start);
        return startDateB - startDateA;
      });
    return mappedData;
  };



const getEndDate = (experience: AboutContentDataProps) => {
  if (experience?.currently || experience?.end_date?.toString() === "Present") {
    return process.env.NEXT_PUBLIC_TOGGLE_PRESENT_DATE === "true"
      ? formatDate(new Date(), "MMM-YYYY")
      : "Present";
  }
  return formatDate(experience.end_date!, "MMM-YYYY");
};

export {
  getEndDate,
  groupDataByOrganization, 
  timeLineFormatData
}