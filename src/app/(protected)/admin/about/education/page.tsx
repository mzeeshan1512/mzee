"use client"
import React from "react";
import dynamic from "next/dynamic";
import { adminAboutPageRoutes, adminRoutes } from "@/routes";
import { CollectionIDs } from "@/shared/constants/collection-ids";
import { EducationFieldsList } from  "@/shared/fields-list/about-content";;
import { EducationValidation, EducationArrayValidation } from "@/shared/validation/about-schema";
import { dateToParsed } from "@/shared/utils/date";
const AdminContentController = dynamic(
  () => import("@/app/(protected)/admin/(components)/admin-content-controller"),
  { ssr: false }
);

const page = () => {
  const TableHeader: TableDataKeyList[] = [
    {
      data_key: "title",
      title: "Degree",
      isSortable: true,
    },
    {
      data_key: "organization",
      title: "Institute",
      isSortable:true
    },
    {
      data_key: "end_date",
      title: "Timeline",
      cell: (item: ExperienceData) => {
        return (
          <span>
            {dateToParsed(item?.start_date!)} -{" "}
            {item?.currently
              ? "Present"
              : dateToParsed(item?.end_date!)}
          </span>
        );
      },
      isSortable: true,
    },
  ];

  return (
    <AdminContentController
      breadCrumbs={{
        parent: {
          title: "About",
          link: adminRoutes.about,
        },
        childList: [
          {
            title: "Education",
            link: adminAboutPageRoutes.education,
          },
        ],
      }}
      tableDataKeyList={TableHeader}
      collectionId={CollectionIDs.education}
      fieldsList={EducationFieldsList}
      fieldArrayName={CollectionIDs?.education}
      formValidationSchema={{
        array:EducationArrayValidation,
        field:EducationValidation
      }}
      formType="field-array-form"
    />
  );
};

export default page;
