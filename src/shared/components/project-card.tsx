/* eslint-disable @next/next/no-img-element */
import React from "react";
import { DefaultBg } from "../app-config";
import { RenderSvgAsDangerouslySetInnerHTML } from "./svg-gradient-binder";
import ShowIf from "./show-if";
import TrustedRedirect from "./trusted-redirect";
import { GitHub } from "../icon/social";
import { InternalPreview, WebPreview } from "../icon/common";

const LinkRenderer = ({
  github_url,
  demo_link,
  disable_demo,
  web_preview,
  i
}: ProjectsBasicInfo & { i?: number }) => {
  return (
    <ul className={`flex list-none gap-2 ${i! % 2 === 0 ? "justify-end" : ""}`}>
      {github_url && (
        <li className="hover:scale-125 drop-shadow-md">
          <TrustedRedirect href={github_url} isTrusted>
            <GitHub />
          </TrustedRedirect>
        </li>
      )}
      {web_preview && (
        <li className="hover:scale-125 drop-shadow-md cursor-pointer">
          <InternalPreview />
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
    </ul>
  );
};

const TechRenderer = ({
  i,
  tech_stack
}: ProjectsBasicInfo & { i?: number }) => {
  return (
    <ul className={`flex list-none gap-4 ${i! % 2 === 0 ? "justify-end" : ""}`}>
      {tech_stack?.map((item, index) => (
        <li key={index} className="text-gradient text-lg font-semibold">
          <RenderSvgAsDangerouslySetInnerHTML
            {...item?.value?.svg?.props}
            width={25}
            height={25}
            className="shrink-0 drop-shadow-lg"
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

const ProjectInfoCard = ({
  basicInfo,
  imageGallery,
  i
}: ProjectsData & {
  i: number;
}) => {
  return (
    <div
      className="relative group rounded-lg shadow-xl m-2 h-64 overflow-hidden transition-all ease-in-out duration-75 hover:scale-110 cursor-pointer"
      style={{
        backgroundImage: `url(${imageGallery.banner_image.src?.url!})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {basicInfo?.is_featured && (
        <div className="absolute top-0 right-0">Featured</div>
      )}
      <div className="absolute top-3/4 left-0 w-full h-full bg-slate-400 bg-opacity-10 transition-all duration-1000 ease-in-out group-hover:top-[58%] group-hover:bg-opacity-50">
        <div className="p-4">
          <div className="flex justify-between">
            <h1 className="text-gradient">
              <strong>{basicInfo.title}</strong>
            </h1>
            <TechRenderer {...basicInfo} />
          </div>
          <div className="hidden transition-all ease-in-out duration-1000 group-hover:block mt-4">
            <LinkRenderer {...basicInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

// const ProjectDetailedInfoCard = ({
//   basicInfo,
//   imageGallery,
//   i
// }: ProjectsData & {
//   i: number;
// }) => {
//   console.log({ imageGallery: JSON.stringify(imageGallery) });
//   return (
//     <div key={i} className={`mb-20 relative p-4 shadow shadow-primary-50`}>
//       <div
//         className={`w-6/12 relative bg-inherit p-4 flex ${
//           i % 2 === 0 ? "left-0 justify-start" : "left-2/4 justify-end self-end"
//         }`}
//         data-aos={i % 2 === 0 ? "zoom-in-right" : "zoom-in-left"}
//         data-aos-duration="1000"
//       >
//         <img
//           src={imageGallery?.banner_image?.src?.url!}
//           alt={basicInfo.title}
//           className="object-contain w-full h-full"
//         />
//       </div>
//       <div
//         className={`absolute inset-y-0 self-center w-7/12 z-10 p-4 flex flex-col gap-3 ${
//           i % 2 === 0 ? "right-4 text-right" : "left-4 text-left"
//         }`}
//         data-aos={i % 2 === 0 ? "zoom-in-left" : "zoom-in-right"}
//         data-aos-duration="1000"
//       >
//         <div
//           className={`flex text-gradient font-bold text-lg ${
//             i % 2 === 0 ? "justify-end" : ""
//           }`}
//         >
//           <span className="text-gradient">Feature Project</span>
//         </div>
//         {/* title */}
//         <h1 className="font-extrabold text-[clamp(15px,2vw,1vw+30px)]">
//           {basicInfo?.title}
//         </h1>
//         {/* description */}
//         <div
//           className={`bg-inherit rounded shadow-md shadow-primary-100 p-5 flex ${
//             i % 2 === 0 ? "justify-end" : ""
//           }`}
//         >
//           <p className="prose text-current text-justify !max-w-[80%]">
//             {basicInfo?.description}
//           </p>
//         </div>
//         {/* tech */}
//         <ul
//           className={`flex list-none gap-4 ${i % 2 === 0 ? "justify-end" : ""}`}
//         >
//           {basicInfo.tech_stack?.map((item, index) => (
//             <li key={index} className="text-gradient text-lg font-semibold">
//               <Image
//                 src={item?.value?.src?.url!}
//                 alt={item.label!}
//                 width={25}
//                 height={25}
//               />
//             </li>
//           ))}
//         </ul>
//         {/* links */}
//         {/* <ul
//           className={`flex list-none gap-4 ${i % 2 === 0 ? "justify-end" : ""}`}
//         >
//           {techList?.map((item: string, index: number) => (
//             <li key={index} className="text-gradient text-lg font-semibold">
//               {item}
//             </li>
//           ))}
//         </ul> */}
//       </div>
//     </div>
//   );
// };

const ProjectDetailedInfoCard = ({
  basicInfo,
  imageGallery,
  i
}: ProjectsData & {
  i: number;
}) => {
  return (
    <div
      key={i}
      className={`mb-20 relative p-4 shadow shadow-primary-50 grid grid-cols-2 items-center`}
    >
      <img
        src={imageGallery?.banner_image?.src?.url!}
        alt={basicInfo.title}
        className={`object-contain w-full h-full  ${
          i % 2 === 0 ? "order-1" : "order-2"
        }`}
        data-aos={i % 2 === 0 ? "zoom-in-right" : "zoom-in-left"}
        data-aos-duration="1000"
      />
      <div
        className={`relative h-full flex flex-col gap-4 ${
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
          className={`relative -left-14 glassmorphic min-h-[10vw+50px] w-[calc(100%+3.5rem)] inset-y-0 bg-inherit rounded shadow-md shadow-primary-100 p-5 flex ${
            i % 2 === 0 ? "justify-end" : ""
          }`}
        >
          <p className="prose text-current text-justify !max-w-[90%]">
            {basicInfo?.description}
          </p>
        </div>
        <ShowIf
          conditionalRenderKey={
            basicInfo?.content_ownership && basicInfo?.content_ownership_link
          }
        >
          <TrustedRedirect href={basicInfo.content_ownership_link}>
            CC:{" "}
            <span className="hovered-text-gradient">
              {basicInfo.content_ownership}
            </span>
          </TrustedRedirect>
        </ShowIf>
        {/* tech */}
        <TechRenderer {...basicInfo} i={i} />
        {/* links */}
        <LinkRenderer {...basicInfo} i={i} />
      </div>
    </div>
  );
};

export { ProjectDetailedInfoCard, ProjectInfoCard };
