import React from "react";
import SectionContainer from "./(components)/section-wrapper";
import { sectionIds } from "@/shared/constants-enums/navigation-list";
import Counter from "@/shared/components/counter";
import { Globe as World } from "./(components)/time-zone-globe";
import Button, { BlendMode } from "@/shared/components/button";

const About = () => {
  return (
    <SectionContainer
      id={sectionIds.about}
      title={sectionIds.about}
      quotation="Failure teaches me that I can actually do this!"
      containerProps={{
        className: "mb-4 p-4"
      }}
    >
      {/* time and overview */}
      <div className="relative grid grid-flow-row md:grid-cols-2 gap-8 items-center">
        <div>
          <article
            className="html-danger-text prose text-current"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            dangerouslySetInnerHTML={{
              __html: process.env.NEXT_PUBLIC_ABOUT_INFO!
            }}
          />
          <Button
            blendMode={BlendMode.GRADIENT}
            className="bg-primary-gradient hover:bg-primary-hover-gradient mt-4"
          >
            Find out more
          </Button>
        </div>
        <World
          showArcs
          canvasClass="top-1/2"
          containerProps={{
            className: "!h-[85%] overflow-hidden",
            style: { boxShadow: "0 7px 4px -8px currentColor" }
          }}
        />
      </div>
      {/* exp counts */}
      <div className="grid grid-flow-row-dense  md:grid-flow-col-dense  gap-8 mt-4 pt-4">
        {[
          {
            target: process.env.Next_PUBLIC_ABOUT_EXPERIENCE,
            heading: "Years of Experience",
            duration: 100
          },
          {
            target: process.env.Next_PUBLIC_ABOUT_PROJECT_COUNT,
            heading: "Projects Completed "
          }
        ]?.map((item, index) => (
          <Counter
            heading={item.heading}
            target={+item.target!}
            key={index}
            duration={item.duration}
            mainContainer={{
              className: "overflow-visible !items-center"
            }}
            headingContainer={{
              className: "text-wrap text-gradient"
            }}
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default About;
