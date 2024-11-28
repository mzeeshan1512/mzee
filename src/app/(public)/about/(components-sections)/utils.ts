   const data = [
  {
    "link": "https://www.linkedin.com/company/emblemtechnologies/mycompany/",
    "uid": "uMA3gtQWtlYUlkL1QRI4fgn1JRx1",
    "Organization": "Emblem Technologies",
    "modifiedAt": {
      "seconds": 1704619114,
      "nanoseconds": 857000000
    },
    "end": "Present",
    "currently_working": true,
    "title": "Frontend Developer",
    "start": "2023-09-20",
    "id": "qO7xiU1YDUYt7bwRBqy5"
  },
  {
    "title": "MERN Stack Developer",
    "start": "2023-08-01",
    "end": "2023-09-04",
    "Organization": "Cooperative Computing",
    "uid": "uMA3gtQWtlYUlkL1QRI4fgn1JRx1",
    "currently_working": false,
    "modifiedAt": {
      "seconds": 1704618231,
      "nanoseconds": 624000000
    },
    "link": "https://www.linkedin.com/company/cooperative-computing/",
    "id": "J8GcaFQgRlEIjPcL6tis"
  },
  {
    "start": "2023-06-01",
    "modifiedAt": {
      "seconds": 1704616447,
      "nanoseconds": 939000000
    },
    "link": "https://www.linkedin.com/company/the-hexaa/",
    "title": "Software Engineer",
    "end": "2023-09-04",
    "uid": "uMA3gtQWtlYUlkL1QRI4fgn1JRx1",
    "currently_working": false,
    "Organization": "The Hexaa",
    "id": "JIEyk2bMaqLiDgkASbtc"
  },
  {
    "link": "https://www.linkedin.com/company/the-hexaa/",
    "end": "2023-06-01",
    "Organization": "The Hexaa",
    "uid": "uMA3gtQWtlYUlkL1QRI4fgn1JRx1",
    "currently_working": false,
    "title": "VueJs Developer",
    "start": "2023-05-01",
    "modifiedAt": {
      "seconds": 1704616405,
      "nanoseconds": 706000000
    },
    "id": "EoFBDCZ0BjQyi27ahlrS"
  },
  {
    "modifiedAt": {
      "seconds": 1704616371,
      "nanoseconds": 149000000
    },
    "Organization": "The Hexaa",
    "end": "2023-05-01",
    "currently_working": false,
    "title": "ReactJs Developer",
    "start": "2022-11-22",
    "link": "https://www.linkedin.com/company/the-hexaa/",
    "uid": "uMA3gtQWtlYUlkL1QRI4fgn1JRx1",
    "id": "PtBwQUITqj5NrhH01EJo"
  },
  {
    "end": "2022-11-18",
    "uid": "uMA3gtQWtlYUlkL1QRI4fgn1JRx1",
    "start": "2022-09-01",
    "modifiedAt": {
      "seconds": 1704615780,
      "nanoseconds": 949000000
    },
    "title": "NextJs Developer ",
    "currently_working": false,
    "link": "https://www.linkedin.com/company/sysvoy/?originalSubdomain=pk",
    "Organization": "Sysvoy International",
    "id": "FqNvgfQoiiNyVgKDRWII"
  }
]
 const timeLineFormatData = (input: any) => {
    const mappedData = input?.reduce((result: any, item: any) => {
      if (item.Organization && item.link) {
        result.organization = item.Organization;
        result.link = item.link;
        result.category = item?.category;
        if (!result.timeline) {
          result.timeline = [];
        }
        if (item.title && item.start && item.end) {
          result.timeline.push({
            title: item.title,
            start: item.start,
            end:item.end,
          });
        }
        if (!result.start || new Date(item.start) < new Date(result.start)) {
          result.start = item.start;
        }
        if (
          item?.end === "Present" ||
          !result.end ||
          new Date(item.end) >= new Date(result.end)
        ) {
          result.end = item.end;
        }
      }
      return result;
    }, {});
    return mappedData;
  };
 export const groupDataByOrganization = () => {
    const organizationGroups: any | null | undefined = {};
    data?.forEach((item: any) => {
      const timeLine = item?.Organization;
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



