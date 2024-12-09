"use client"
import React from "react";
import dynamic from "next/dynamic";
import { adminAboutPageRoutes, adminRoutes } from "@/routes";
import { CollectionIDs } from "@/shared/constants/collection-ids";
import { TrainingsField } from  "@/shared/fields-list/about-content";;
import { TrainingsValidation, TrainingsArrayValidation } from "@/shared/validation/about-schema";
import {  } from "@/shared/utils/date";
const AdminContentController = dynamic(
  () => import("@/app/(protected)/admin/(components)/admin-content-controller"),
  { ssr: false }
);

const page = () => {
  const TableHeader: TableDataKeyList[] = [
    {
      data_key: "title",
      title: "Course",
      isSortable: true
    },
    {
      data_key: "organization",
      title: "Institute",
      isSortable: true
    },
    {
      data_key: "end_date",
      title: "Timeline",
      cell: (item: AboutContentDataProps) => {
        return (
          <span>
            {(item?.start_date!)} -{" "}
            {item?.currently ? "Present" : (item?.end_date!)}
          </span>
        );
      },
      isSortable: true
    }
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
            title: "Trainings",
            link: adminAboutPageRoutes.trainings,
          },
        ],
      }}
      formValidationSchema={{
        array:TrainingsArrayValidation,
        field:TrainingsValidation
      }}
      tableDataKeyList={TableHeader}
      collectionId={CollectionIDs.training}
      fieldsList={TrainingsField}
      fieldArrayName={CollectionIDs.training}
    />
  );
};

export default page;
