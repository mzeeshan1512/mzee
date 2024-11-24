"use client";
import React from "react";
import SectionContainer from "./(components)/section-wrapper";
import SVGGradientBinder from "@/shared/components/svg-gradient-binder";
import { sectionIds } from "@/shared/constants-enums/navigation-list";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import ShowIf from "@/shared/components/show-if";
import Carousel from "@/shared/components/carousel";

type Props = {
  data?: Services_TechsTools | null;
  toggleGradient?: boolean;
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

const Services = () => {
  const mediumDeviceMedia1024 = useMediaQuery("(max-width: 1024px)", true, {
    getInitialValueInEffect: false
  });
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
      <ShowIf
        conditionalRenderKey={mediumDeviceMedia1024}
        elseComponent={
          <div className="hidden lg:grid grid-cols-1 gap-4 gap-y-12 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <ServiceCard key={index} />
            ))}
          </div>
        }
      >
        <Carousel
          responsive={{
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 3
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1
            }
          }}
          autoPlay
          infinite
        >
          {[1, 2, 3, 4, 5].map((item, index) => (
            <ServiceCard key={index} />
          ))}
        </Carousel>
      </ShowIf>
    </SectionContainer>
  );
};

export default Services;
