import {
  ListWrapper,
  RenderCoursesList,
  RenderListItemContent,
  StickyImageWrapper
} from "./content-wrappers";
/* assets/images */
import ExpImg from "@/assets/content/experience.png";
import EduImg from "@/assets/content/education.png";
import CertImg from "@/assets/content/certificate.png";
import { AboutPageColllectionIds } from "@/shared/firebase/collection-ids";
import {
  fetchRecordsOnServer,
  firebaseCondition
} from "@/shared/firebase/server-actions";
import { groupDataByTimeLineMappedFormat } from "./utils";
import { DateFormat } from "@/shared/utils/date";
import { json } from "stream/consumers";

type Content<T> = {
  formatDataFn?: (data: T) => any;
  imageClassName?: string;
  imgSrc: any;
  groupByField?: string;
  format?: DateFormat;
  conditions?: firebaseCondition;
};
const ContentList: Record<AboutPageColllectionIds, Content<unknown>> = {
  [AboutPageColllectionIds.experience]: {
    imageClassName: "!rounded-full",
    imgSrc: ExpImg,
    formatDataFn: groupDataByTimeLineMappedFormat as any,
    groupByField: "organization"
  },
  [AboutPageColllectionIds.education]: {
    imgSrc: EduImg,
    format: "YYYY",
    conditions: {
      orderByFields: {
        field: "start_date",
        direction: "desc"
      }
    }
  },
  [AboutPageColllectionIds.courses_certification]: {
    imgSrc: CertImg,
    formatDataFn: (data: any): GroupedCoursesCertification[] => {
      return Object?.keys?.(data)?.map((key) => {
        const objectInHand: Courses_Certification = data[key][0];
        return {
          prefix: key,
          institute: objectInHand.organization!,
          platform: objectInHand.platform!,
          courses: data[key]
        };
      });
    },
    groupByField: "prefix",
    conditions: {
      excludeFields: ["start_date", "end_date", "same_as"],
      orderByFields: {
        field: "created_at",
        direction: "asc"
      }
    }
  },
  [AboutPageColllectionIds.training]: {
    imgSrc: CertImg
  }
};

const TanContent = async ({ id }: { id: AboutPageColllectionIds }) => {
  const tabContent: Content<unknown> = ContentList[id];
  const serverAction = fetchRecordsOnServer();
  await serverAction.getDocuments({
    collectionId: id,
    groupedData: tabContent.groupByField
      ? {
          groupByField: tabContent.groupByField!,
          groupedCallBackFn: tabContent.formatDataFn!
        }
      : null,
    conditions: tabContent.conditions
  });
  return (
    <>
      <ListWrapper list={serverAction.data}>
        {id === AboutPageColllectionIds.courses_certification ? (
          <RenderCoursesList />
        ) : (
          <RenderListItemContent format={tabContent?.format} />
        )}
      </ListWrapper>
      <StickyImageWrapper
        imgAlt={id}
        imgSrc={tabContent.imgSrc}
        imageClassName={tabContent?.imageClassName! || ""}
      />
    </>
  );
};

export default TanContent;
