import React from "react";
import dynamic from "next/dynamic";
const Tabs = dynamic(() => import("@/shared/components/tabs"));

const tabList = [
  {
    tabId: "1",
    tabContent: <>tabI</>,
    title: "t1"
  },
  {
    tabId: "2",
    tabContent: <>tabI2</>,
    title: "t12"
  }
];

const page = () => {
  return <Tabs tabsList={tabList} />;
};

export default page;
