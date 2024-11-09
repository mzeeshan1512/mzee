"use client";
import React from "react";
import dynamic from "next/dynamic";
import { CollectionIDs } from "@/shared/constants/collection-ids";
import { getDateTimeString } from "@/shared/utils/date";
const AdminContentController = dynamic(
  () => import("@/app/(protected)/admin/(components)/admin-content-controller"),
  { ssr: false }
);

const ContactForm = () => {
  const contentList: TableDataKeyList[] = [
    {
      title: "Name",
      data_key: "name",
    },
    {
      title: "Email",
      data_key: "email",
    },
    {
      title: "Contact Number",
      data_key: "contact_number",
    },
    {
      title: "Subject",
      data_key: "subject",
    },
    {
      title: "Message",
      data_key: "message",
    },
    {
      title: "Submitted Date",
      data_key: "created_at",
      cell: (item: contact_form) => getDateTimeString(item?.created_at),
    },
  ];
  return (
    <div className="p-3">
      <AdminContentController
        breadCrumbs={{
          parent: {
            title: "Contact",
          },
          childList: [
            {
              title: "Submitted Contact Form",
              link: "",
            },
          ],
        }}
        tableDataKeyList={contentList}
        showButtonControl={false}
        showActionsColumn={false}
        collectionId={CollectionIDs.contact}
        fieldsList={[]}
        hideExport={true}
      />
    </div>
  );
};

export default ContactForm;
