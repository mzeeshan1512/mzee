import React from "react";
import dynamic from "next/dynamic";
import { TabList as list } from "@/shared/components/tabs";
import { AboutPageColllectionIds } from "@/shared/firebase/collection-ids";
// dynamic loading
const Tabs = dynamic(() => import("@/shared/components/tabs"));
const TabContentContainer = dynamic(() =>
  import("./(components-sections)/tab-content-container")
);
const Overview = dynamic(() => import("./(components-sections)/overview"));
const TanContent = dynamic(() =>
  import("./(components-sections)/tabs-content")
);

enum TabList {
  Overview = "overview",
  Experience = "experience",
  Education = "education",
  Certifications = "certifications",
  Trainings = "trainings",
  Skills = "skills"
}

const tabList: list[] = [
  {
    tabId: TabList.Overview,
    tabContent: (
      <TabContentContainer title={TabList.Overview} contentClass="hide-scroll">
        <Overview />
      </TabContentContainer>
    ),
    title: TabList.Overview
  },
  {
    tabId: TabList.Experience,
    tabContent: (
      <TabContentContainer title={TabList.Experience}>
        <TanContent id={AboutPageColllectionIds.experience} />
      </TabContentContainer>
    ),
    title: TabList.Experience
  },
  // {
  //   tabId: TabList.Skills,
  //   tabContent: (
  //     <TabContentContainer title={TabList.Skills}>
  //       <TanContent id={AboutPageColllectionIds.skills} />
  //     </TabContentContainer>
  //   ),
  //   title: TabList.Skills,
  //   disabled: true
  // },
  {
    tabId: TabList.Certifications,
    tabContent: (
      <TabContentContainer title={TabList.Certifications}>
        <TanContent id={AboutPageColllectionIds.courses_certification} />
      </TabContentContainer>
    ),
    title: TabList.Certifications
    // disabled: true
  },
  {
    tabId: TabList.Education,
    tabContent: (
      <TabContentContainer title={TabList.Education}>
        <TanContent id={AboutPageColllectionIds.education} />
      </TabContentContainer>
    ),
    title: TabList.Education
  },
  {
    tabId: TabList.Trainings,
    tabContent: (
      <TabContentContainer title={TabList.Trainings}>
        <TanContent id={AboutPageColllectionIds.training} />
      </TabContentContainer>
    ),
    title: TabList.Trainings
  }
];

const page = () => {
  return (
    <main className="container mx-auto mb-4 md:my-4 w-calc-10 block md:flex rounded items-start">
      <Tabs
        tabsList={tabList}
        navContainerProps={{
          className:
            "sm:sticky sm:top-[78px] sm:z-10 md:w-60 md:mt-10 bg-white dark:bg-black md:!bg-transparent"
        }}
        listContainerProps={{
          className:
            "md:flex-col border border-b-none md:border-none sm:rounded !gap-2 md:!gap-4"
        }}
        listItemProps={{
          className:
            "capitalize bg-[#F9FAFB] md:border-r-3 md:border-primary-500 dark:bg-[#1d1d1e] p-2 md:p-4 md:rounded shadow-[inset_0_-3px_0px_rgba(0,0,0,0.3)] md:shadow-[0px_5px_10px_rgba(0,0,0,0.2),inset_-3px_0px_0px_rgba(0,0,0,0.3)] hover:text-secondary-400 hover:!shadow-[inset_0_-3px_0px_var(--primary)] hover:md:!shadow-[inset_-3px_0px_0px_var(--primary)]"
        }}
        activeTabClass="!bg-white md:!bg-[var(--section-odd-bg)] !text-secondary-500 !border-none !shadow-[inset_0_-3px_0px_var(--primary)] md:!shadow-[inset_-3px_0px_0px_var(--primary)]"
      />
    </main>
  );
};

export default page;
