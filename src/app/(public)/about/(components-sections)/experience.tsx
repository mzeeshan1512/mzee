import React from "react";
import ExpImg from "@/assets/content/experience.png";
import TrustedRedirect from "@/shared/components/trusted-redirect";
import ShowIf from "@/shared/components/show-if";
import { formatDate } from "@/shared/utils/date";
import { groupDataByOrganization } from "./utils";
import { ListWrapper, StickyImageWrapper } from "./content-wrappers";

const renderTrustedDomain = (experience: ExperienceData) => (
  <div className="hover-bottom-outline">
    <TrustedRedirect
      href={experience?.link}
      className={`!font-normal ${
        experience?.timeLine?.length! > 0
          ? ""
          : "!text-red-500 text-sm hover:!text-transparent"
      }`}
    >
      {experience?.organization}
    </TrustedRedirect>
  </div>
);

const getEndDate = (experience: ExperienceData) => {
  if (experience?.currently || experience?.end_date?.toString() === "Present") {
    return process.env.NEXT_PUBLIC_TOGGLE_PRESENT_DATE === "true"
      ? formatDate(new Date(), "MMM-YYYY")
      : "Present";
  }
  return formatDate(experience.end_date!, "MMM-YYYY");
};

const renderTimeLineFormat = (timeline: ExpTimelineFormat[]) => {
  return (
    <ul className="ps-5">
      {timeline?.map((item, index) => (
        <li key={index} className="text-[clamp(15px,1.1vw,1.1vw+15px)]">
          <div className="flex flex-col ps-4 py-2 relative">
            <div
              className={`absolute h-3 w-3 rounded-full top-[14px] -left-1 ${
                item?.end_date?.toLowerCase() === "present"
                  ? "bg-primary-500"
                  : "bg-slate-600"
              }`}
            />
            <div className="absolute h-[95%] top-[14px] left-[0.1rem] border-s-2 border-spacing-2 border-slate-600" />
            <h1>{item?.title}</h1>
            <small className="text-sm text-slate-400">
              <time>{formatDate(item?.start_date!, "MMM-YYYY")}</time>
              <span className="mx-1">-</span>
              <time>{getEndDate(item)}</time>
            </small>
          </div>
        </li>
      ))}
    </ul>
  );
};

const ExperienceItem = (experience: ExperienceData) => {
  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <ShowIf
          conditionalRenderKey={experience?.timeLine?.length! > 0}
          elseComponent={<span>{experience?.title}</span>}
        >
          {renderTrustedDomain(experience)}
        </ShowIf>
        <div className="text-slate-400">
          <time>{formatDate(experience?.start_date!, "MMM-YYYY")}</time>
          <span className="mx-1">-</span>
          <time>{getEndDate(experience)}</time>
        </div>
      </div>
      <ShowIf
        conditionalRenderKey={experience?.timeLine?.length! > 0}
        elseComponent={renderTrustedDomain(experience)}
      >
        {renderTimeLineFormat(experience?.timeLine!)}
      </ShowIf>
    </>
  );
};

const Experience = () => {
  const data: any = groupDataByOrganization();

  return (
    <>
      <ListWrapper list={data}>
        <ExperienceItem />
      </ListWrapper>
      <StickyImageWrapper imgAlt="experience" imgSrc={ExpImg} />
    </>
  );
};

export default Experience;
