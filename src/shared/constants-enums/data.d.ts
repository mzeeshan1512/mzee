interface commonData {
  id?: string;
  userId?: string;
  edited_by?: string;
  created_by?: string;
  title?: string;
  is_archived?: boolean;
  created_at?: any;
  modified_at?: any;
}

/* about data types start */
interface CommonAbout extends commonData {
  link?: string;
  duration?: string;
  description?: string;
  organization?: string;
}
interface ExperienceData extends CommonAbout {
  start_date?: string;
  end_date?: string;
  currently?: boolean;
}
interface SkillsData {
  category: {
    value: string;
    label: string;
  };
  skills: {
    value: string;
    label: string;
  }[];
}
interface Courses_Certification {
  platform?: string;
  verificationId?: string;
  prefix?: string;
}
type AboutData = CommonAbout &
  ExperienceData &
  SkillsData &
  Courses_Certification;
/* about data types end */
interface contact_form extends commonData {
  name: string;
  email: string;
  message: string;
  contact_number: string;
  subject: string;
}

/* icons data types start */
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
/* icons data types end */

/* blob options start*/
interface blobOption {
    label?: string;
    value?: {
      src?: blobSrc;
      id?: string;
      svg?: blobSvg;
    };
}
/* blob options end */

/* service data types start */
interface Services_TechsTools extends commonData {
  blob?:blobOption
  description?: string;
  category?:string
}
/* service data types end */

type DataObj = AboutData &
  IconsListingData &
  contact_form &
  Services_TechsTools;

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