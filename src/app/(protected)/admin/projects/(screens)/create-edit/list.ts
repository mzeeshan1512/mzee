import { formFieldsList } from "@/shared/types/fields";

const basicPrefilledFields: formFieldsList[] = [
  {
    type: "text",
    name: "my_role",
    label: "My Role",
    value: "Full Stack Developer",
    colClassName: "mb-2",
  },
  {
    type: "text",
    name: "github_url",
    label: "Github Url",
    value: process.env.NEXT_PUBLIC_GITHUB,
    colClassName: "mb-2",
  },
  {
    type: "switch",
    name: "web_preview",
    label: "Is Web Preview",
    radioCheckLabelPlacement: "left",
    colClassName: "align-self-center",
    checked: true,
  },
  {
    type: "switch",
    name: "is_featured",
    label: "Is Featured",
    radioCheckLabelPlacement: "left",
    colClassName: "align-self-center",
    checked: true,
    impactedKey: {
          key: "is_worthy",
          isDisabled: true,
          fieldKey:"is_featured"
        },
  },
  {
    type: "switch",
    name: "is_worthy",
    label: "Is Worthy",
    radioCheckLabelPlacement: "left",
    colClassName: "align-self-center",
    checked: true,
    watchedKey:"is_featured"
  },
  
];

const basicOptionalFields: formFieldsList[] = [
  {
    type: "text",
    name: "content_ownership",
    label: "Content Ownership",
    colClassName: "mb-2",
  },
  {
    type: "text",
    name: "content_ownership_link",
    label: "Content Ownership Ref. Link",
    colClassName: "mb-2",
  },
  {
    type: "text",
    name: "demo_link",
    label: "Demo Link",
    colClassName: "mb-2",
  },
  {
    type: "switch",
    name: "disable_demo",
    radioCheckLabelPlacement: "left",
    colClassName: "align-self-center",
    label: "Disable Demo",
    checked:false
  },
];

const imageGalleryFields:formFieldsList[] = [
  {
    type: "file",
    name: "banner_image",
    label: "Banner Image",
    colClassName: "mb-2",
    accept:"image/*",
    required:true,
  },
  {
    type: "file",
    name: "slider_images",
    label: "Slider Image(s)",
    colClassName: "mb-2",
    accept:"image/*",
    multiple:true,
    col:12,
  },
]

const videoGalleryFields:formFieldsList[] = [
  {
    type: "file",
    name: "banner_video",
    label: "Banner Video",
    colClassName: "mb-2",
    accept:"video/*",
  },
  {
    type: "file",
    name: "demo_video",
    label: "Demo video",
    colClassName: "mb-2",
    accept:"video/*",
  },
]

const detailedContentFields:formFieldsList[] = [
  {
    type: "rich-text",
    name: "content",
    label: "Project Details",
    colClassName: "mb-2",
    parsedHtml:true,
    modalPreview:true,
    enablePreview:true
  },
]

export { basicPrefilledFields, basicOptionalFields,imageGalleryFields,videoGalleryFields, detailedContentFields };
