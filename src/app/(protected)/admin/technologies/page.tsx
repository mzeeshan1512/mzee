/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { adminRoutes } from "@/routes";
import { formFieldsList } from "@/shared/types/fields";
import { IconsFields } from "@/shared/fields-list/list";
import CallBackForm from "@/shared/hook-forms/call-back-form";
import { CollectionIDs } from "@/shared/constants/collection-ids";
import {
  IconsValidation,
  TechValidation
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

const category = ["UI/UX","Development","Libraries","Framework","Web Development","Mobile Development","Software Development", "Others"]

const TechnologiesPage = () => {
  const { data } = useGetDocuments(CollectionIDs.icons);
  const TableHeader: TableDataKeyList[] = [
    {
      data_key: "",
      title: "Technologies",
      cell: (item: Services_TechsTools) => item?.blob?.label!
    },
    {
      data_key: "category",
      title: "Category",
       cell: (item: Services_TechsTools) => item?.category?.map(item=>item.label).join(", ") ?? null
    },
    {
      data_key: "svg",
      title: "Svg",
      cell: (item: Services_TechsTools) => {
        return (
          <img src={item?.blob?.value?.src?.url!} alt={item?.blob?.label!} width={50} height={50} style={{
            objectFit: "contain",
            aspectRatio:"1/1"
          }} />
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
      type: "text",
      name: "category",
      label: "Category",
      required: true,
      isMulti:true,
      options:category?.map((item)=>({label:item,value:item})),
      col: 6
    }
  ];

  return (
    <div className="p-3">
      <AdminContentController
        breadCrumbs={{
          parent: {
            title: "Technologies",
            link: adminRoutes.technology
          },
          childList: []
        }}
        tableDataKeyList={TableHeader}
        collectionId={CollectionIDs.technologies}
        fieldsList={fieldList}
        formValidationSchema={{
          field: TechValidation
        }}
      />
    </div>
  );
};

export default TechnologiesPage;
