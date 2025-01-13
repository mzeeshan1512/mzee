/* eslint-disable @next/next/no-img-element */
import React from "react";
import { RenderSvgAsDangerouslySetInnerHTML } from "./svg-gradient-binder";
import ShowIf from "./show-if";
import TrustedRedirect from "./trusted-redirect";
import { GitHub } from "../icon/social";
import { /* InternalPreview, */ WebPreview } from "../icon/common";
import Carousel from "./carousel";
import ProjectDemoVdeo, { ProjectInfo } from "./project-demo-video";
import { DefaultBg } from "../app-config";
import { ProjectCategoryList } from "../utils/common";

const LinkRenderer = ({
  github_url,
  demo_link,
  disable_demo,
  src,
  title,
  web_preview,
  description,
  showInfo,
  project_category,
  i
}: ProjectsBasicInfo & {
  i?: number;
  showInfo?: boolean;
} & videoUploadType) => {
  return (
    <ul className={`flex list-none gap-2 ${i! % 2 === 0 ? "justify-end" : ""}`}>
      {github_url &&
        project_category?.value !== ProjectCategoryList.industrial && (
          <li className="hover:scale-125 drop-shadow-md">
            <TrustedRedirect href={github_url} isTrusted>
              <GitHub />
            </TrustedRedirect>
          </li>
        )}
      {/* {web_preview && (
        <li className="hover:scale-125 drop-shadow-md cursor-pointer">
          <InternalPreview />
        </li>
      )} */}
      {src && (
        <li className="hover:scale-125 drop-shadow-md cursor-pointer">
          <ProjectDemoVdeo {...src} title={title} />
        </li>
      )}
      {demo_link && (
        <li className="hover:scale-125 drop-shadow-md">
          <TrustedRedirect
            href={demo_link}
            className={disable_demo ? "opacity-50 cursor-not-allowed" : ""}
          >
            <WebPreview />
          </TrustedRedirect>
        </li>
      )}
      {showInfo && (
        <li className="hover:scale-125 drop-shadow-md">
          <ProjectInfo description={description ?? ""} title={title} />
        </li>
      )}
    </ul>
  );
};
const TechRenderer = ({
  i,
  tech_stack
}: ProjectsBasicInfo & { i?: number }) => {
  return (
    <ul className={`flex list-none gap-2 ${i! % 2 === 0 ? "justify-end" : ""}`}>
      {tech_stack?.map((item, index) => (
        <li key={index} className="text-lg font-semibold">
          <RenderSvgAsDangerouslySetInnerHTML
            {...item?.value?.svg?.props}
            width={25}
            height={25}
            className="shrink-0 dark:shadow-slate-400 drop-shadow-lg hover:scale-x-125"
            title={item.label}
            dangerouslySetInnerHTML={{
              __html: item?.value?.svg?.code
            }}
          />
        </li>
      ))}
    </ul>
  );
};

const ImageRenderer = ({
  banner_image,
  slider_images,
  title
}: ProjectImageGallery & { title: string; imgClass?: string }) => {
  const images = [banner_image, ...(slider_images! ?? [])];
  return images?.length > 0 ? (
    <Carousel
      autoPlay
      infinite
      showArrows={false}
      showDots={false}
      responsive={{
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      }}
      sliderContainerProps={{
        className: "h-full"
      }}
      slidesProps={{
        className: "!p-0 !h-full"
      }}
    >
      {images?.map((item, index) => {
        return (
          <img
            key={item?.src?.url ?? index}
            src={item?.src?.url ?? DefaultBg?.src}
            // onError={(e: any) => {
            //   e.target.src = DefaultBg?.src;
            // }}
            alt={title}
            loading="lazy"
            className={`object-fill md:object-contain w-full h-full rounded-lg`}
          />
        );
      })}
    </Carousel>
  ) : null;
};

const RenderCreditContent = ({
  content_ownership,
  content_ownership_link,
  disable_demo,
  textColor
}: ProjectsBasicInfo & { textColor?: string }) => {
  return (
    <ShowIf conditionalRenderKey={content_ownership && content_ownership_link}>
      <TrustedRedirect
        href={content_ownership_link}
        disable={disable_demo}
        className={textColor ?? ""}
      >
        <span>🔗 CC:</span>
        <span className="ms-1 hovered-text-gradient ">{content_ownership}</span>
      </TrustedRedirect>
    </ShowIf>
  );
};

const ProjectInfoCard = ({
  basicInfo,
  imageGallery,
  disableHoverScale,
  videoGallery,
  i
}: ProjectsData & {
  i: number;
  disableHoverScale?: boolean;
}) => {
  return (
    <div
      className={`relative group rounded-lg shadow-md shadow-secondary-100 dark:shadow-primary-100 h-64 overflow-hidden transition-all ease-in-out duration-75 ${
        disableHoverScale ? "" : "hover:scale-110"
      } cursor-pointer`}
      // style={{
      //   backgroundImage: `url(${imageGallery.banner_image.src?.url!})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center"
      // }}
    >
      <ImageRenderer {...imageGallery} title={basicInfo.title} />
      {basicInfo?.is_featured && (
        <div className="absolute top-[-2px] right-[-2px] w-[150px] h-[150px] overflow-hidden z-10">
          <div className="absolute left-[45px] top-4 w-full bg-primary-gradient text-white shadow-lg transform rotate-45 capitalize text-center tracking-wide">
            <small>Featured</small>
          </div>
        </div>
      )}
      <div className="absolute top-3/4 left-0 rounded-e-lg w-full h-full bg-slate-400 bg-opacity-40 transition-all duration-1000 ease-in-out group-hover:top-[50%] group-hover:bg-opacity-70">
        <div className="p-4">
          <div className="flex justify-between flex-wrap">
            <h1 className="text-gradient">
              <strong>{basicInfo.title}</strong>
            </h1>
            <TechRenderer {...basicInfo} />
          </div>
          <div className="hidden transition-all ease-in-out duration-1000 group-hover:block mt-2">
            <LinkRenderer
              {...basicInfo}
              {...videoGallery?.demo_video}
              showInfo
            />
            <RenderCreditContent {...basicInfo} textColor="text-white mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};
const ProjectDetailedInfoCard = ({
  basicInfo,
  imageGallery,
  videoGallery,
  i
}: ProjectsData & {
  i: number;
}) => {
  return (
    <div
      key={i}
      className={`mb-20 relative p-4 shadow shadow-primary-50 grid grid-cols-2 items-center`}
    >
      <figure
        className={`object-contain w-full h-full rounded-lg  ${
          i ? (+i % 2 === 0 ? "order-1" : "order-2") : ""
        }`}
        data-aos={i ? (+i! % 2 === 0 ? "zoom-in-right" : "zoom-in-left") : ""}
        data-aos-duration="1000"
      >
        <ImageRenderer {...imageGallery} title={basicInfo.title} />
      </figure>
      <div
        className={`relative z-10 h-full flex flex-col gap-4 ${
          i % 2 === 0 ? "order-2 text-right" : "order-1 text-left"
        }`}
        data-aos={i % 2 === 0 ? "zoom-in-left" : "zoom-in-right"}
        data-aos-duration="1000"
      >
        {/* title */}
        <div className="">
          <div
            className={`flex text-gradient font-bold text-lg ${
              i % 2 === 0 ? "justify-end" : ""
            }`}
          >
            <span className="text-gradient">Feature Project</span>
          </div>
          <h1 className="font-extrabold text-[clamp(15px,2vw,1vw+30px)]">
            {basicInfo?.title}
          </h1>
        </div>
        {/* description */}
        <div
          className={`relative glassmorphic min-h-[10vw+50px] w-[calc(100%+3.5rem)] inset-y-0 bg-inherit rounded shadow-md shadow-primary-100 p-5 flex ${
            i % 2 === 0 ? "justify-end -left-14" : ""
          }`}
        >
          <p className="prose text-current text-justify !max-w-[90%]">
            {basicInfo?.description}
          </p>
        </div>
        <RenderCreditContent {...basicInfo} />
        {/* tech */}
        <TechRenderer {...basicInfo} i={i} />
        {/* links */}
        <LinkRenderer {...basicInfo} i={i} {...videoGallery?.demo_video} />
      </div>
    </div>
  );
};

export { ProjectDetailedInfoCard, ProjectInfoCard };
