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
interface AboutContentDataProps extends CommonAbout {
  start_date?: string;
  end_date?: string;
  currently?: boolean;
}
interface Courses_Certification {
  platform?: string;
  verificationId?: string;
  prefix?: string;
}
type AboutData = CommonAbout &
  AboutContentDataProps &
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

interface blobOption {
    label?: string;
    value?: {
      src?: blobSrc;
      id?: string;
      svg?: blobSvg;
    };
}
/* icons data types end */

/* service data types start */
interface Services_TechsTools extends commonData {
  blob?: blobOption;
  description?: string;
  category?:string
}
/* service data types end */

type DataObj = AboutData &
  IconsListingData &
  contact_form &
  Services_TechsTools;

type blobObj = {
  src: {
    type: string;
    url: string;
  };
  directory?: string;
};

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
  // is_featured?: boolean;
  project_category?:selectObject,
  /* optional */
  demo_link?: string;
  disable_demo?: boolean;
  content_ownership?: string;
  content_ownership_link?: string;
};
type ProjectImageGallery = {
  banner_image: blobObj;
  slider_images?: blobObj[];
};

type ProjectVideGallery = {
  banner_video?: blobObj;
  demo_video?: blobObj;
};

interface ProjectsData extends commonData {
  basicInfo: ProjectsBasicInfo;
  imageGallery: ProjectImageGallery;
  videoGallery?: ProjectVideGallery;
  detailedContent?: { content?: string };
}

interface LogsInfo {
  city?: string;
  country?: string;
  region?: string;
  ip?: string;
  latitude?: string;
  longitude?: string;
  hostname?: string;
  date?: string;
  time?: string;
  modified_at?: string;
}
