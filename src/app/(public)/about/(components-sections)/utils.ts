const data: ExperienceData[] = [
  {
    id: "qO7xiU1YDUYt7bwRBqy5",
    title: "Frontend Developer",
    link: "https://www.linkedin.com/company/emblemtechnologies/mycompany/",
    organization: "Emblem Technologies",
    start_date: "2023-09-20",
    end_date: "Present",
    description: "Currently working as a Frontend Developer at Emblem Technologies.",
  },
  {
    id: "J8GcaFQgRlEIjPcL6tis",
    title: "MERN Stack Developer",
    link: "https://www.linkedin.com/company/cooperative-computing/",
    organization: "Cooperative Computing",
    start_date: "2023-08-01",
    end_date: "2023-09-04",
    description: "Worked as a MERN Stack Developer at Cooperative Computing.",
  },
  {
    id: "JIEyk2bMaqLiDgkASbtc",
    title: "Software Engineer",
    link: "https://www.linkedin.com/company/the-hexaa/",
    organization: "The Hexaa",
    start_date: "2023-06-01",
    end_date: "2023-09-04",
    description: "Worked as a Software Engineer at The Hexaa.",
  },
  {
    id: "EoFBDCZ0BjQyi27ahlrS",
    title: "VueJs Developer",
    link: "https://www.linkedin.com/company/the-hexaa/",
    organization: "The Hexaa",
    start_date: "2023-05-01",
    end_date: "2023-06-01",
    description: "Worked as a VueJs Developer at The Hexaa.",
  },
  {
    id: "PtBwQUITqj5NrhH01EJo",
    title: "ReactJs Developer",
    link: "https://www.linkedin.com/company/the-hexaa/",
    organization: "The Hexaa",
    start_date: "2022-11-22",
    end_date: "2023-05-01",
    description: "Worked as a ReactJs Developer at The Hexaa.",
  },
  {
    id: "FqNvgfQoiiNyVgKDRWII",
    title: "NextJs Developer",
    link: "https://www.linkedin.com/company/sysvoy/?originalSubdomain=pk",
    organization: "Sysvoy International",
    start_date: "2022-09-01",
    end_date: "2022-11-18",
    description: "Worked as a NextJs Developer at Sysvoy International.",
  }
];

 const timeLineFormatData = (input: ExperienceData[]) => {
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
 export const groupDataByOrganization = () => {
    const organizationGroups: any | null | undefined = {};
    data?.forEach((item) => {
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



