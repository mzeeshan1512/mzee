/* eslint-disable @next/next/no-img-element */
"use client";
import { adminAboutPageRoutes, adminRoutes } from "@/routes";
import {
  MultiValueWithIcon,
  OptionWithIcon
} from "@/shared/components/central-fields-control-unit/select/components";
import { CollectionIDs } from "@/shared/constants/collection-ids";
import { IconsFields } from "@/shared/fields-list/list";
import { useGetDocuments } from "@/shared/firebase-services/useCollections";
import CallBackForm from "@/shared/hook-forms/call-back-form";
import { formFieldsList } from "@/shared/types/fields";
import {
  MainSkillsArrayValidation,
  MainSkillsValidation
} from "@/shared/validation/about-schema";
import { IconsValidation } from "@/shared/validation/content-schemas";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

const AdminContentController = dynamic(
  () => import("@/app/(protected)/admin/(components)/admin-content-controller"),
  { ssr: false }
);

const Skills = () => {
  const { data } = useGetDocuments(CollectionIDs.icons);
  const TableHeader: TableDataKeyList[] = [
    {
      data_key: "category",
      title: "category"
    },
    {
      data_key: "skills",
      title: "Skills",
      cell: (item: skills) => {
        return (
          <div className="d-flex gap-2 flex-wrap">
            {item?.skills?.map((item, index) => (
              <div key={index} className="d-flex align-items-center gap-2">
                <img width={40} src={item.value?.src?.url} alt={item?.label} />
                <span>{item?.label}</span>
              </div>
            ))}
          </div>
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
      name: "category",
      label: "Category",
      placeholder: "Select Category",
      options: [
        { value: "web_development", label: "Web Development" },
        { value: "frontend_development", label: "Frontend Development" },
        { value: "backend_development", label: "Backend Development" },
        { value: "software_engineering", label: "Software Engineering" },
        { value: "it_support_&_networking", label: "It Support & Networking" },
        { value: "other", label: "Other" }
      ],
      required: true,
      isClearable: true,
      col: 6
    },
    {
      name: "skills",
      label: "Icon",
      required: true,
      isMulti: true,
      options: options,
      customComponent: {
        Option: OptionWithIcon,
        MultiValue: MultiValueWithIcon
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
    }
  ];
  return (
    <AdminContentController
      breadCrumbs={{
        parent: {
          title: "About",
          link: adminRoutes.about
        },
        childList: [
          {
            title: "Skills",
            link: adminAboutPageRoutes.skills
          }
        ]
      }}
      tableDataKeyList={TableHeader}
      collectionId={CollectionIDs.skills}
      fieldsList={fieldList}
      fieldArrayName={CollectionIDs?.skills}
      formValidationSchema={{
        array: MainSkillsArrayValidation,
        field: MainSkillsValidation
      }}
      formType="field-array-form"
    />
  );
};

export default Skills;
