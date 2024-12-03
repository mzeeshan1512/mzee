/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { adminRoutes } from "@/routes";
import { formFieldsList } from "@/shared/types/fields";
import { IconsFields } from "@/shared/fields-list/list";
import CallBackForm from "@/shared/hook-forms/call-back-form";
import { CollectionIDs } from "@/shared/constants/collection-ids";
import {
  IconsValidation,
  ServiceValidation
} from "@/shared/validation/content-schemas";
import { useGetDocuments } from "@/shared/firebase-services/useCollections";
import {
  OptionWithIcon,
  SingleValueWithIcon
} from "@/shared/components/central-fields-control-unit/select/components";
const AdminContentController = dynamic(
  () => import("@/app/(protected)/admin/(components)/admin-content-controller"),
  { ssr: false }
);

const ServicesPage = () => {
  const { data } = useGetDocuments(CollectionIDs.icons);
  const TableHeader: TableDataKeyList[] = [
    {
      data_key: "title",
      title: "Services",
      isSortable: true
    },
    {
      data_key: "description",
      title: "Description"
    },
    {
      data_key: "svg",
      title: "Svg",
      cell: (item: Services_TechsTools) => {
        return (
          <img src={item?.blob?.value?.src?.url!} alt={item?.blob?.label!} />
        );
      }
    }
  ];

  const options = useMemo(() => {
    if (data?.length > 0) {
      return data.map((item: IconsListingData) => {
        return {
          label: item.title,
          value: {
            src: item?.blob?.src,
            svg: item?.blob?.svg || null,
            id: item?.id
          }
        };
      });
    }
    return [];
  }, [data]);

  const fieldList: formFieldsList[] = [
    {
      type: "text",
      name: "title",
      label: "Title",
      required: true,
      col: 6
    },
    {
      type: "text",
      name: "blob",
      label: "Icon",
      required: true,
      options: options,
      customComponent: {
        Option: OptionWithIcon,
        SingleValue: SingleValueWithIcon
      },
      CallBackComponent: (
        <CallBackForm
          callBackLabel="Add"
          fieldsList={IconsFields}
          collectionId={CollectionIDs.icons}
          validationSchema={IconsValidation}
          modalTile="Add Icon"
          formType="file-uploader-form"
        />
      ),
      col: 6
    },
    {
      type: "textarea",
      name: "description",
      label: "Description",
      required: true,
      col: 12
    }
  ];

  return (
    <div className="p-3">
      <AdminContentController
        breadCrumbs={{
          parent: {
            title: "Services",
            link: adminRoutes.services
          },
          childList: []
        }}
        tableDataKeyList={TableHeader}
        collectionId={CollectionIDs.services}
        fieldsList={fieldList}
        formValidationSchema={{
          field: ServiceValidation
        }}
      />
    </div>
  );
};

export default ServicesPage;
