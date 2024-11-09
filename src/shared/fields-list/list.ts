import { formFieldsList } from "../types/fields";

const IconsFields: formFieldsList[] = [
  {
    type: "text",
    name: "title",
    label: "Title",
    required: true,
    col: 12,
  },
  {
    type: "file",
    name: "blob",
    label: "Icon",
    accept: ".svg",
    required: true,
    isSvg: true,
    col: 12,
  },
];

// projects
const projectsTabsList = [
  {
    title: "one",
    content: null,
  },
  {
    title: "two",
    content: null,
    disabled: true,
  },
];

const ProjectDataTableList = [
    {
        title: "Title",
        key: "title",
        type: "text",
    },
    {
        title: "Icon",
        key: "icon",
        type: "image",
    }
]

export { IconsFields, projectsTabsList };
