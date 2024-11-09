"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { adminAboutPageRoutes, adminRoutes } from "@/routes";
import { CollectionIDs } from "@/shared/constants/collection-ids";
import { formFieldsList, selectObject } from "@/shared/types/fields";
import { MainSkillsValidation, MainSkillsArrayValidation } from "@/shared/validation/about-schema";
const AdminContentController = dynamic(
  () => import("@/app/(protected)/admin/(components)/admin-content-controller"),
  { ssr: false }
);

const SkillsPage = () => {
  const [options, setOptions]=useState<selectObject[]>([])
  const list: TableDataKeyList[] = [
    {
      data_key: "title",
      title: "Title",
      isSortable: true,
    },
    {
      data_key: "category",
      title: "Category",
      cell: (item: SkillsData) => item?.category?.label,
    },
    {
      data_key: "skills",
      title: "Skills",
      cell: (item: SkillsData) =>
        item?.skills?.map((skill: selectObject) => skill?.label)?.join(","),
    },
  ];

  const SkillsFieldList : formFieldsList[]=[
    {
        type: "text",
        name: "title",
        placeholder: "Title",
        required: true,
    },
    {
        name: "category",
        placeholder: "Select Category",
        options:[
            {value:"web_development",label:"Web Development"},
            {value:"frontend_development",label:"Frontend Development"},
            {value:"backend_development",label:"Backend Development"},
            {value:"software_engineering",label:"Software Engineering"},
            {value:"it_support_&_networking",label:"It Support & Networking"},
            {value:"other",label:"Other"}
        ],
        required: true,
        isClearable:true
    },
    {
        name: "skills",
        placeholder: "Select Skills",
        selectCssClass:"even-odd-bg",
        options:options,
        callBack:setOptions,
        required: true,
        isMulti:true,
        isCreatable:true,
        isClearable:true,
    }
]

  return (
    <AdminContentController
      breadCrumbs={{
        parent: {
          title: "About",
          link: adminRoutes.about,
        },
        childList: [
          {
            title: "Skills",
            link: adminAboutPageRoutes.skills,
          },
        ],
      }}
      tableDataKeyList={list}
      collectionId={CollectionIDs.skills}
      fieldsList={SkillsFieldList}
      formValidationSchema={{
        array: MainSkillsArrayValidation,
        field: MainSkillsValidation,
      }}
      formType="tabular-form"
      fieldArrayName={CollectionIDs.skills}
      formClassName="p-2 pt-3"
    />
  );
};

export default SkillsPage;
