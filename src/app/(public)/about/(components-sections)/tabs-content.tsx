import {
  ListWrapper,
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
      orderByFields: 
        {
          field: "start_date",
          direction: "desc"
        }
      
    }
  },
  [AboutPageColllectionIds.courses_certification]: {
    imgSrc: CertImg
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
        <RenderListItemContent format={tabContent?.format} />
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
