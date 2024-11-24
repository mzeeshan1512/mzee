"use client";
import React from "react";
import SectionContainer from "./(components)/section-wrapper";
import { sectionIds } from "@/shared/constants-enums/navigation-list";
import { RenderSvgAsDangerouslySetInnerHTML } from "@/shared/components/svg-gradient-binder";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import ShowIf from "@/shared/components/show-if";
import Carousel from "@/shared/components/carousel";

const t = {
  blob: {
    value: {
      svg: {
        code: `<g id="Group 8">,<path id="Path 70" d="M10.384 13.2671H9.15914C6.80678 13.2671 4.89178 11.3532 4.89178 8.99936C4.89178 6.64554 6.80552 4.73165 9.15914 4.73165H10.384V0H8.99734C4.03604 0 0 4.03637 0 8.99809C0 13.9598 4.03604 17.9962 8.99734 17.9962H10.384V13.2645V13.2671Z" fill="#1C7E41"/>,<path id="Path 71" d="M17.0027 0.0012207H12.0667V4.73287H16.8409C19.1932 4.73287 21.1082 6.64677 21.1082 9.00058C21.1082 11.3544 19.1945 13.2683 16.8409 13.2683H12.0667V17.9999H17.0027C21.964 17.9999 26 13.9636 26 9.00185C26 4.04012 21.964 0.00374752 17.0027 0.00374752V0.0012207Z" fill="#1C7E41"/>,</g>`,
        props: {
          fill: "none",
          height: "18",
          viewBox: "0 0 26 18",
          width: "26",
          xmlns: "http://www.w3.org/2000/svg"
        }
      }
    },
    label: "Distinctio Aut eius"
  }
};

const Tech = ({ tech }: { tech: Services_TechsTools }) => {
  return (
    <div
      className="bg-transparent cursor-default p-5 flex justify-center gap-2 items-center text-4xl border rounded-xl lg:border-none drop-shadow hover:scale-125 hover:border-none"
      data-aos="flip-up"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      title={tech?.blob?.label}
    >
      <RenderSvgAsDangerouslySetInnerHTML
        {...tech?.blob?.value?.svg?.props}
        className="shrink-0"
        title={tech?.blob?.label}
        dangerouslySetInnerHTML={{
          __html: tech?.blob?.value?.svg?.code
        }}
      />
      <small className="">{tech?.blob?.label}</small>
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
      containerProps={{
        className: "pt-4 mt-4"
      }}
    >
      <ShowIf
        conditionalRenderKey={mediumDeviceMedia1024}
        elseComponent={
          <div className="hidden lg:grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <Tech key={index} tech={t} />
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
          showArrows={false}
          autoPlay
          infinite
        >
          {[1, 2, 3, 4, 5].map((item, index) => (
            <Tech key={index} tech={t} />
          ))}
        </Carousel>
      </ShowIf>
    </SectionContainer>
  );
};

export default TechStack;
