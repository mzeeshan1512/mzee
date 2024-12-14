interface commonData {
  id?: string;
  title?: string;
}

/* about data types start */
interface CommonAbout extends commonData {
  link?: string;
  duration?: string;
  description?: string;
  organization?: string;
}

interface ExpTimelineFormat {
  start_date?: string | Date;
  end_date?: string | Date;
  title?:string
  currently?:boolean
}
interface AboutContentDataProps extends CommonAbout {
  start_date?: string | Date;
  end_date?: string | Date;
  currently?: boolean;
  timeLine?:ExpTimelineFormat[]
}

interface Courses_Certification extends CommonAbout {
  platform?: string;
  verificationId?: string;
  prefix?: string;
}

interface GroupedCoursesCertification{
  platform?:string,
  prefix?:string,
  institute?:string,
  courses?:Courses_Certification[]
}

type AboutData = CommonAbout &
  AboutContentDataProps &
  SkillsData &
  Courses_Certification;

interface blobSrc {
  url: string;
  type: string;
}
interface blobSvg {
  code?: string;
  props?: GenericObject;
}
interface IconsListingData extends commonData {
  blob: {
    src?: blobSrc;
    svg?: blobSvg;
  };
  directory?: string;
}

interface blobOption {
    label?: string;
    value?: {
      src?: blobSrc;
      id?: string;
      svg?: blobSvg;
    };
}

interface Services_TechsTools extends commonData {
  blob?:blobOption
  description?: string;
  category?:string
}

/* projects */
type ProjectsBasicInfo = {
  /* required */
  title: string;
  unique_identifier: string;
  tech_stack: string;
  description: string;
  /* good to have */
  my_role?: string;
  github_url?: string;
  web_preview?: string;
  is_featured?: boolean;
  /* optional */
  demo_link?: string;
  disable_demo?: boolean;
  content_ownership?: string;
  content_ownership_link?: string;
};
type ProjectImageGallery = {
  banner_image: IconsListingData;
  slider_images?: IconsListingData[];
};

type ProjectVideGallery = {
  banner_video?: IconsListingData;
  demo_video?: IconsListingData;
};

interface ProjectsData extends commonData {
  basicInfo: ProjectsBasicInfo;
  imageGallery: ProjectImageGallery;
  videoGallery?: ProjectVideGallery;
  detailedContent?: { content?: string };
}