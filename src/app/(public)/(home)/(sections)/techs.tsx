"use client";
import React from "react";
import SectionContainer from "./(components)/section-wrapper";
import { sectionIds } from "@/shared/constants-enums/navigation-list";
import SVGGradientBinder from "@/shared/components/svg-gradient-binder";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import ShowIf from "@/shared/components/show-if";
import Carousel from "@/shared/components/carousel";

const Tech = ({ tech }: { tech: ServicesListingData }) => {
  return (
    <div
      className="bg-transparent cursor-default p-5 flex justify-center gap-2 items-center text-4xl"
      data-aos="flip-up"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      title={tech?.title}
    >
      <SVGGradientBinder>{tech.blob?.value?.svg}</SVGGradientBinder>
      <span>{tech?.title}</span>
    </div>
  );
};

const TechStack = () => {
  const mediumDeviceMedia1024 = useMediaQuery("(max-width: 1024px)", true, {
    getInitialValueInEffect: false
  });
  return (
    <SectionContainer
      id={sectionIds.tech}
      title="Tools Behind the Magic" /* "Tech Stack That Drives Excellence" */
      quotation="Excellence isn't built in a day; it's engineered with the right tools." /* "Precision, performance, and power —stacked for success." */
    >
      <ShowIf
        conditionalRenderKey={mediumDeviceMedia1024}
        elseComponent={
          <div className="hidden lg:grid grid-cols-1 gap-4 gap-y-12 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <Tech key={index} tech={index} />
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
        >
          {[1, 2, 3, 4, 5].map((item, index) => (
            <Tech key={index} tech={index} />
          ))}
        </Carousel>
      </ShowIf>
    </SectionContainer>
  );
};

export default TechStack;
