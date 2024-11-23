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
interface IconsListingData extends commonData {
  blob: {
    src?: string;
    base64?: string;
    svg?: {
      code?: string;
      props?: Record<string,any>;
    };
  };
  directory?: string;
}
/* icons data types end */

/* service data types start */
interface ServicesListingData extends commonData, IconsListingData {
  blob?: {
    label?: string;
    value?: {
      base64?: string;
      src?: {
        type?:string,
        url?:string
      };
      id?: string;
      svg?: any;
    };
  };
  description?: string;
}
/* service data types end */

type DataObj = AboutData &
  IconsListingData &
  contact_form &
  ServicesListingData;

type blobObj ={
  src:{
    type:string,
    url:string
  },
  directory?:string
}  