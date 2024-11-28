import React from "react";
import Image from "next/image";
import ExpImg from "@/assets/content/experience.png";
import TrustedRedirect from "@/shared/components/trusted-redirect";
import ShowIf from "@/shared/components/show-if";
import { formatDate } from "@/shared/utils/date";
import { groupDataByOrganization } from "./utils";

const renderTrustedDomain = (experience: any) => (
  <div className="hover-bottom-outline">
    <TrustedRedirect
      href={experience?.link}
      className={`!font-normal ${
        experience?.timeline?.length > 0
          ? ""
          : "!text-red-500 text-sm hover:!text-transparent"
      }`}
    >
      {experience?.organization || experience?.Organization}
    </TrustedRedirect>
  </div>
);

const getEndDate = (experience: any) => {
  if (
    experience?.currently_working ||
    experience?.end?.toString() === "Present"
  ) {
    return process.env.NEXT_PUBLIC_TOGGLE_PRESENT_DATE === "true"
      ? formatDate(new Date(), "MMM-YYYY")
      : "Present";
  }
  return formatDate(experience.end, "MMM-YYYY");
};

const renderTimeLineFormat = (timeline: any) => {
  return (
    <ul className="ps-5">
      {timeline?.map((item: any, index: number) => (
        <li key={index} className="text-[clamp(15px,1.1vw,1.1vw+15px)]">
          <div className="flex flex-col ps-4 py-2 relative">
            <div
              className={`absolute h-3 w-3 rounded-full top-[14px] -left-1 ${
                item?.end?.toLowerCase() === "present"
                  ? "bg-primary-500"
                  : "bg-slate-600"
              }`}
            />
            <div className="absolute h-[95%] top-[14px] left-[0.1rem] border-s-2 border-spacing-2 border-slate-600" />
            <h1>{item?.title}</h1>
            <small className="text-sm text-slate-400">
              <time>{formatDate(item?.start, "MMM-YYYY")}</time>
              <span className="mx-1">-</span>
              <time>{getEndDate(item)}</time>
            </small>
          </div>
        </li>
      ))}
    </ul>
  );
};

const Experience = () => {
  const data: any = groupDataByOrganization();

  return (
    <div className="grid grid-flow-row md:grid-cols-3 gap-8 relative min-h-[200px] md:me-4">
      <ul className="list-[square] ps-5 marker:text-primary-500 md:col-span-2">
        {data?.map((experience: any, index: number) => (
          <li
            className=" text-[clamp(15px,1.1vw,1.1vw+15px)] py-2"
            key={index}
            data-aos="zoom-in-right"
            data-aos-duration="1000"
          >
            <div className="flex justify-between items-center flex-wrap gap-2">
              <ShowIf
                conditionalRenderKey={experience?.timeline?.length > 0}
                elseComponent={<span>{experience?.title}</span>}
              >
                {renderTrustedDomain(experience)}
              </ShowIf>
              <div className="text-slate-400">
                <time>{formatDate(experience?.start, "MMM-YYYY")}</time>
                <span className="mx-1">-</span>
                <time>{getEndDate(experience)}</time>
              </div>
            </div>
            <ShowIf
              conditionalRenderKey={experience?.timeline?.length > 0}
              elseComponent={renderTrustedDomain(experience)}
            >
              {renderTimeLineFormat(experience?.timeline)}
            </ShowIf>
          </li>
        ))}
      </ul>
      <div className="order-2 hidden md:block">
        <div className="p-2 mx-auto md:sticky md:top-0 md:inset-x-0 overflow-hidden">
          <div
            className="flex flex-col gap-3 justify-center w-full items-center"
            data-aos="zoom-in-left"
            data-aos-duration="1000"
          >
            <Image
              src={ExpImg}
              alt={process.env.NEXT_PUBLIC_APP_Name || ""}
              className="w-full p-2 rounded-full aspect-square drop-shadow-[-1px_2px_5px_var(--secondary)] dark:drop-shadow-[-1px_2px_5px_var(--primary)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
