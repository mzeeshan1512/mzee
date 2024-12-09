"use client";
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { CollectionIDs } from "@/shared/constants/collection-ids";
import { adminAboutPageRoutes, adminRoutes } from "@/routes";
import { ExperienceFieldsList } from "@/shared/fields-list/about-content";
import { ExperienceValidation } from "@/shared/validation/about-schema";
import {  } from "@/shared/utils/date";
const AdminContentController = dynamic(
  () =>
    import(
      "@/app/(protected)/admin/(components)/admin-content-controller"
    ),
  { ssr: false }
);

const page = () => {
  const TableHeader: TableDataKeyList[] = [
    {
      data_key: "title",
      title: "Title",
      // isSortable: true
    },
    {
      data_key: "organization",
      title: "Organization",
      cell: (item: AboutContentDataProps) => {
        return (
          <Link
            className="general-hover-cursor"
            href={item?.link!}
            target="_blank"
          >
            {item?.organization}
          </Link>
        );
      }
    },
    {
      data_key: "description",
      title: "Description"
    },
    {
      data_key: "start_date",
      title: "Timeline",
      cell: (item: AboutContentDataProps) => {
        return (
          <span>
            {(item?.start_date!)} -{" "}
            {item.currently ? "Present" : (item?.end_date!)}
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
            title: "Experience",
            link: adminAboutPageRoutes.experience,
          },
        ],
      }}
      tableDataKeyList={TableHeader}
      collectionId={CollectionIDs.experience}
      fieldsList={ExperienceFieldsList}
      formValidationSchema={{
        field: ExperienceValidation,
      }}
    />
  );
};

export default page;
