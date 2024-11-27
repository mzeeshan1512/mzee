import React from "react";
import dynamic from "next/dynamic";
// dynamic loading
const Tabs = dynamic(() => import("@/shared/components/tabs"));
const TabContentContainer = dynamic(
  () => import("./(components-sections)/tab-content-container")
);
const Overview = dynamic(() => import("./(components-sections)/overview"));

enum TabList {
  Overview = "overview",
  Experience = "experience",
  Education = "education",
  Certifications = "certifications",
  Trainings = "trainings"
}

const tabList = [
  {
    tabId: TabList.Overview,
    tabContent: (
      <TabContentContainer title={TabList.Overview}>
        <Overview />
      </TabContentContainer>
    ),
    title: TabList.Overview
  },
  {
    tabId: TabList.Experience,
    tabContent: (
      <TabContentContainer title={TabList.Experience}>
        {TabList.Experience}
      </TabContentContainer>
    ),
    title: TabList.Experience
  },
  {
    tabId: TabList.Certifications,
    tabContent: (
      <TabContentContainer title={TabList.Overview}>
        {TabList.Certifications}
      </TabContentContainer>
    ),
    title: TabList.Certifications
  },
  {
    tabId: TabList.Education,
    tabContent: (
      <TabContentContainer title={TabList.Education}>
        {TabList.Education}
      </TabContentContainer>
    ),
    title: TabList.Education
  },
  {
    tabId: TabList.Trainings,
    tabContent: (
      <TabContentContainer title={TabList.Trainings}>
        {TabList.Trainings}
      </TabContentContainer>
    ),
    title: TabList.Trainings
  }
];

const page = () => {
  return (
    <div className="container mx-auto my-4 w-calc-10 block md:flex rounded items-start">
      <Tabs
        tabsList={tabList}
        navContainerProps={{
          className: "md:w-60 md:mt-10"
        }}
        listContainerProps={{
          className:
            "md:flex-col border border-b-none md:border-none sm:rounded"
        }}
        listItemProps={{
          className:
            "capitalize bg-[#F9FAFB] md:border-r-3 md:border-primary-500 dark:bg-[#1d1d1e] p-4 md:rounded shadow-[inset_0_-3px_0px_rgba(0,0,0,0.3)] md:shadow-[0px_5px_10px_rgba(0,0,0,0.2),inset_-3px_0px_0px_rgba(0,0,0,0.3)]"
        }}
        activeTabClass="!bg-white md:!bg-[var(--section-odd-bg)] !text-primary-500 !border-none !shadow-[inset_0_-3px_0px_var(--primary)] md:!shadow-[inset_-3px_0px_0px_var(--primary)]"
      />
    </div>
  );
};

export default page;
