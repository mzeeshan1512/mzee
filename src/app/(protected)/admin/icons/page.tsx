/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import dynamic from "next/dynamic";
import { adminRoutes } from "@/routes";
import { IconsFields } from "@/shared/fields-list/list";
import { CollectionIDs } from "@/shared/constants/collection-ids";
import { IconsValidation } from "@/shared/validation/content-schemas";
const AdminContentController = dynamic(
  () => import("@/app/(protected)/admin/(components)/admin-content-controller"),
  { ssr: true }
);

const page = () => {
  const contentList: TableDataKeyList[] = [
    {
      title: "Title",
      data_key: "title"
    },
    {
      title: "Icon",
      data_key: "",
      cell: (item: IconsListingData) => {
        return <img src={item?.blob?.src?.url} alt={item?.title} width={50} />;
      }
    }
  ];

  return (
    <div className="p-3">
      <AdminContentController
        breadCrumbs={{
          parent: {
            title: "Icons",
            link: adminRoutes.icons
          },
          childList: []
        }}
        tableDataKeyList={contentList}
        collectionId={CollectionIDs.icons}
        fieldsList={IconsFields}
        formValidationSchema={{
          field: IconsValidation
        }}
        showEditButton={false}
        showEyeIcon={false}
        formType="file-uploader-form"
        directoryParentKey="blob"
      />
    </div>
  );
};

export default page;
