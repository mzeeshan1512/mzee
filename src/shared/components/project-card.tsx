import Image from "next/image";
import React from "react";
import { DefaultBg } from "../app-config";

const ProjectInfoCard = ({
  title,
  description,
  techList,
  link,
  image,
  i
}: any) => {
  return (
    <div
      className="relative group rounded-lg shadow-xl m-2 h-64 overflow-hidden transition-all ease-in-out duration-75 hover:scale-110"
      style={{
        backgroundImage: `url(${DefaultBg?.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute top-3/4 left-0 w-full h-full bg-slate-400 bg-opacity-10 transition-all duration-1000 ease-in-out group-hover:top-[58%] group-hover:bg-opacity-50">
        <div className="p-4">
          <h1 className=" text-white">Title</h1>
        </div>
      </div>
    </div>
  );
};

const ProjectDetailedInfoCard = ({
  title,
  description,
  techList,
  link,
  image,
  i
}: any) => {
  return (
    <div key={i} className={`mb-20 relative p-4 shadow shadow-primary-50`}>
      <div
        className={`w-6/12 relative bg-inherit p-4 flex ${
          i % 2 === 0 ? "left-0 justify-start" : "left-2/4 justify-end self-end"
        }`}
        data-aos={i % 2 === 0 ? "zoom-in-right" : "zoom-in-left"}
        data-aos-duration="1000"
      >
        <Image src={image} alt="" />
      </div>
      <div
        className={`absolute inset-y-0 self-center w-7/12 z-10 p-4 flex flex-col gap-3 ${
          i % 2 === 0 ? "right-4 text-right" : "left-4 text-left"
        }`}
        data-aos={i % 2 === 0 ? "zoom-in-left" : "zoom-in-right"}
        data-aos-duration="1000"
      >
        <div
          className={`flex text-gradient font-bold text-lg ${
            i % 2 === 0 ? "justify-end" : ""
          }`}
        >
          <span className="text-gradient">Feature Project</span>
        </div>
        {/* title */}
        <h1 className="font-extrabold text-[clamp(15px,2vw,1vw+30px)]">
          {title}
        </h1>
        {/* description */}
        <div
          className={`bg-inherit rounded shadow-md shadow-primary-100 p-5 flex ${
            i % 2 === 0 ? "justify-end" : ""
          }`}
        >
          <p className="prose text-current text-justify !max-w-[80%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            sit amet mi nulla. Proin a sapien euismod felis rhoncus sodales.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            sit amet mi nulla. Proin a sapien euismod felis rhoncus sodales.
          </p>
        </div>
        {/* tech */}
        <ul
          className={`flex list-none gap-4 ${i % 2 === 0 ? "justify-end" : ""}`}
        >
          {techList?.map((item: string, index: number) => (
            <li key={index} className="text-gradient text-lg font-semibold">
              {item}
            </li>
          ))}
        </ul>
        {/* links */}
        <ul
          className={`flex list-none gap-4 ${i % 2 === 0 ? "justify-end" : ""}`}
        >
          {techList?.map((item: string, index: number) => (
            <li key={index} className="text-gradient text-lg font-semibold">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { ProjectDetailedInfoCard, ProjectInfoCard };
