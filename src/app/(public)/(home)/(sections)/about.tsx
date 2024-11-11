import React from "react";
import SectionContainer from "./(components)/section-wrapper";
import { sectionIds } from "@/shared/constants-enums/navigation-list";
import Counter from "@/shared/components/counter";
import { Globe as World } from "./(components)/globe";

const About = () => {
  return (
    <SectionContainer
      id={sectionIds.about}
      title="About"
      quotation="Failure teaches me that I can actually do this!"
    >
      {/* time and overview */}
      <div className="grid grid-flow-row md:grid-cols-2 gap-8 items-center">
        <div className="h-full w-full">
          <World showArcs />
          <h3
            className="text-gradient text-center"
            style={{
              fontSize: "clamp(1rem, 3vw, 2rem)",
              fontWeight: "bold"
            }}
          >
            flexible with timezones
          </h3>
        </div>
        <article
          className="html-danger-text"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          dangerouslySetInnerHTML={{
            __html: process.env.NEXT_PUBLIC_ABOUT_INFO!
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
