import {
  ListWrapper,
  RenderListItemContent,
  StickyImageWrapper
} from "./content-wrappers";
import { formattedEducationData } from "./json_data_test";
import { groupDataByOrganization } from "./utils";
/* assets/images */
import ExpImg from "@/assets/content/experience.png";
import EduImg from "@/assets/content/education.png";
import CertImg from "@/assets/content/certificate.png";
import { AboutPageColllectionIds } from "@/shared/firebase/collection-ids";

type Content<T> = {
  data: T[];
  imageClassName?: string;
  imgSrc: any;
};
const ContentList = {
  [AboutPageColllectionIds.experience]: {
    data: groupDataByOrganization(),
    imageClassName: "!rounded-full",
    imgSrc: ExpImg
  },
  [AboutPageColllectionIds.education]: {
    data: formattedEducationData,
    imgSrc: EduImg
  },
  [AboutPageColllectionIds.courses_certification]: {
    data: formattedEducationData,
    imgSrc: CertImg
  },
  [AboutPageColllectionIds.training]: {
    data: formattedEducationData,
    imgSrc: CertImg
  }
};

const TanContent = ({ id }: { id: AboutPageColllectionIds }) => {
  const tabContent: Content<unknown> = ContentList[id];
  return (
    <>
      <ListWrapper list={tabContent.data}>
        <RenderListItemContent />
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
