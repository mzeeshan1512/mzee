"use client"
import React from "react";
import dynamic from "next/dynamic";
import { adminAboutPageRoutes, adminRoutes } from "@/routes";
import { CollectionIDs } from "@/shared/constants/collection-ids";
import { CoursesAndCertifications } from "@/shared/fields-list/about-content";
import { CoursesAndCertificationsValidation } from "@/shared/validation/about-schema";
const AdminContentController = dynamic(
  () => import("@/app/(protected)/admin/(components)/admin-content-controller"),
  { ssr: false }
);

const page = () => {
  const TableHeader: TableDataKeyList[] = [{ data_key: "title", title: "Course" }, { data_key: "organization", title: "Institute" }];
      // isSortable: true,
      // isSortable:true

  return (
    <AdminContentController
      breadCrumbs={{
        parent: {
          title: "About",
          link: adminRoutes.about,
        },
        childList: [
          {
            title: "Course & Certifications",
            link: adminAboutPageRoutes.courses_certification,
          },
        ],
      }}
      tableDataKeyList={TableHeader}
      collectionId={CollectionIDs.courses_certification}
      fieldsList={CoursesAndCertifications}
      formValidationSchema={{
        field:CoursesAndCertificationsValidation
      }}
    />
  );
};

export default page;
