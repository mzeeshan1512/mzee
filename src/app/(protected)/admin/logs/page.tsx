"use client";
import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CollectionIDs } from "@/shared/constants/collection-ids";
import AdminContentController from "@/app/(protected)/admin/(components)/admin-content-controller";

const Logs = () => {
  const searchParams = useSearchParams();
  const navigator = useRouter();
  const pathname = usePathname();
  const type = searchParams?.get("type");

  const contentList: TableDataKeyList[] = [
    {
      title: "Region",
      data_key: "city",
      cell:(item:LogsInfo)=><>{item?.city} {item?.region ?`, ${item?.region}` :null} {item?.country ?`, ${item?.country}` :null}</>
    },
    {
      title: "Ip",
      data_key: "ip",
    },
    {
      title: "Coordinates",
      data_key: "latitude",
      cell:(item:LogsInfo)=><>{item?.latitude} , {item?.longitude}</>
    },
    {
      title: "Date",
      data_key: "date",
    },
    {
      title: "Web Url",
      data_key: "hostname",
    },
  ];

  return (
    <div className="p-3">
      <AdminContentController
        breadCrumbs={{
          parent: {
            title: "Logs",
            link: ""
          },
          childList: [
            {
              title: type === "login" ? "Login" : "Web"
            }
          ]
        }}
        buttonControl={{
          onClick: () => {
            let mode: "login" | "web" = type === "login" ? "web" : "login";
            navigator.replace(`${pathname}?type=${mode}`);
          },
          content: `View ${type === "login" ? "Web" : "Login"} Logs`,
          hideIcon: true
        }}
        tableDataKeyList={contentList}
        collectionId={
          type === "login" ? CollectionIDs.loginLogs : CollectionIDs.webInfo
        }
        fieldsList={[]}
        hideExport={true}
        showEditButton={false}
        showEyeIcon={false}
        isStrikeThroughEffect={false}
      />
    </div>
  );
};

export default Logs;
