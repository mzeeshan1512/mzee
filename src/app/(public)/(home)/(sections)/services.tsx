import React from "react";
import SectionContainer from "./(components)/section-wrapper";
import SVGGradientBinder from "@/shared/components/svg-gradient-binder";
import { sectionIds } from "@/shared/constants-enums/navigation-list";
import Carousel from "@/shared/components/carousel";
import ResponsiveRenderer from "./(components)/responsive-renderer";
import { fetchRecordsOnServer } from "@/shared/firebase/server-actions";
import { CollectionIDs } from "@/shared/firebase/collection-ids";

type Props = {
  data?: Services_TechsTools | null;
  toggleGradient?: boolean;
  loading?:boolean
};

const ServiceCard = ({ data, toggleGradient }: Props) => {  
  return (
    <div className="group flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:items-start gap-3 border lg:border-none p-4 lg:p-0 w-full">
      <div className="flex justify-center" style={{ width: "6.75rem" }}>
        <SVGGradientBinder
          className="lex-grow inline transform transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]"
          height="4em"
          viewBox="0 0 24 24"
          linearGradientProps={{
            id: data?.id
          }}
          fill={toggleGradient ? "currentColor" : `url(#${data?.id})`}
        >
          <path d="M21 17.9995V19.9995H3V17.9995H21ZM17.4038 3.90332L22 8.49951L17.4038 13.0957L15.9896 11.6815L19.1716 8.49951L15.9896 5.31753L17.4038 3.90332ZM12 10.9995V12.9995H3V10.9995H12ZM12 3.99951V5.99951H3V3.99951H12Z" />
        </SVGGradientBinder>
      </div>
      <div className="flex flex-col gap-4 prose !text-inherit">
        <h2
          className={`text-center lg:text-left ${
            toggleGradient ? "text-gradient" : "!text-inherit"
          }`}
        >
          {data?.title}
        </h2>
        <p>{data?.description}</p>
      </div>
    </div>
  );
};

const Services = async() => {
  const serverAction = fetchRecordsOnServer()
  await serverAction.getDocuments({
    collectionId:CollectionIDs.services
  })
  if(serverAction.error){
    return <span className="text-red-400 text-center">{serverAction.error}</span>
  }
  return (
    <SectionContainer
      id={sectionIds.services}
      title={"Your Vision, Our Expertise"}
      quotation="Transforming ideas into reality with expert development, automation, and IT solutions"
      className={
        " !bg-grid-pattern-light dark:!bg-grid-pattern-dark !bg-grid-size relative"
      }
      containerProps={{
        className: "pt-4 mt-4"
      }}
    >
      <ResponsiveRenderer
      elseChildren={
         <div className="hidden lg:grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(serverAction.data)?.map((item:Services_TechsTools, index:number) => (
              <ServiceCard key={index} data={item}/>
            ))}
          </div>
      }
      >
         <Carousel
          autoPlay
          infinite
        >
          {(serverAction.data)?.map((item:Services_TechsTools, index:number) => (
              <ServiceCard key={index} data={item}/>
            ))}
        </Carousel>
      </ResponsiveRenderer>
    </SectionContainer>
  );
};

export default Services;
