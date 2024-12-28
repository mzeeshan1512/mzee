/* eslint-disable @next/next/no-img-element */
"use client";
import React, { CSSProperties, useMemo } from "react";
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
import ToolTip from "@/shared/components/tool-tip";
const AdminContentController = dynamic(
  () => import("@/app/(protected)/admin/(components)/admin-content-controller"),
  { ssr: false }
);

const category = [
  "Software Development – Web, Front-End, Back-End, Full-Stack, API.",
  "Mobile Development – iOS, Android, Cross-Platform.",
  "Testing – Manual, Automated, Performance, Security, Cypress, Playwright, Selenium, TestNG.",
  "UI/UX Design – UI, UX, Prototyping, Accessibility, Figma, Adobe XD, Sketch.",
  "Tools – IDEs, Version Control, DevOps, Cloud, Collaboration, Jira, Trello, Asana.",
  "Emerging Technologies – AI, ML, IoT, Blockchain, AR/VR.",
  "Data and Analytics – Data Science, Big Data, Visualization.",
  "Security – Cybersecurity, Application Security, Penetration Testing.",
  "DevOps & IT Operations – CI/CD, IaC, SRE, Cloud.",
  "Game Development – Game Engines, 3D Modeling, Networking.",
  "Networking – Network Design, SDN, Wireless.",
  "Embedded Systems – Microcontrollers, Firmware, Robotics.",
  "Productivity – Project Management, Remote Work Tools.",
  "Documentation – API Docs, User Manuals.",
  "Third-Party Integrations – Firebase, Cloudinary, Stripe, Twilio, SendGrid, PayPal, AWS Amplify, Algolia.",
  "Databases – Relational Databases (MySQL, PostgreSQL, Oracle), NoSQL Databases (MongoDB, Firebase, CouchDB), In-memory Databases (Redis, Memcached), Data Warehouses (BigQuery, Redshift, Snowflake), Graph Databases (Neo4j, ArangoDB)."
];
const TechnologiesPage = () => {
  const { data } = useGetDocuments(CollectionIDs.icons);
  const TableHeader: TableDataKeyList[] = [
    {
      data_key: "blob",
      title: "Technologies",
      cell: (item: Services_TechsTools) => item?.blob?.label!
    },
    {
      data_key: "category",
      title: "Category",
      cell: (item: Services_TechsTools) => (
        <ToolTip
          toolTipText={item.category?.label!}
          toolTipPosition={"top"}
          mode="body"
        >
          <span
            style={
              {
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "15rem",
                display: "inline-block",
                overflow: "hidden"
              } as CSSProperties
            }
          >
            {item.category?.label}
          </span>
        </ToolTip>
      )
    },
    {
      data_key: "svg",
      title: "Svg",
      cell: (item: Services_TechsTools) => {
        return (
          <img
            src={item?.blob?.value?.src?.url!}
            alt={item?.blob?.label!}
            width={50}
            height={50}
            style={{
              objectFit: "contain",
              aspectRatio: "1/1"
            }}
          />
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
      options: category?.map((item) => ({ label: item, value: item })),
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
