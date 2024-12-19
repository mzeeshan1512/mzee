import React from "react";
import Image from "next/image";
/* shared */
import { Spotlights } from "@/shared/constants-enums/reused-tailwind-css";
import ParticleAnimation from "@/shared/components/particles-animation";
import { sectionIds } from "@/shared/constants-enums/navigation-list";
import { Spotlight } from "@/shared/components/spot-light";
import Counter from "@/shared/components/counter";
/* images */
import { aboutPng } from "@/shared/app-config";
import Earth from "@/assets/content/earth.jpeg";
/* section component */
import SectionContainer from "./(components)/section-wrapper";
import LetsConnect from "./(components)/lets-connect";
import Link from "next/link";

const About = () => {
  return (
    <SectionContainer
      id={sectionIds.about}
      title={"Driven by Passion, Defined by Values"}
      quotation="In the pursuit of greatness, passion ignites the fire, and values sustain it"
      className={
        " !bg-grid-pattern-light dark:!bg-grid-pattern-dark !bg-grid-size relative"
      }
      containerProps={{
        className: "mb-4 p-4"
      }}
      CallBackComponent={
        <>
          {Spotlights?.map((item, index) => (
            <Spotlight
              key={index}
              className={item.className || ""}
              fill={item.fill || ""}
            />
          ))}
          <div className="absolute bottom-0 right-0 z-0 w-4/5 lg:w-2/4 h-[18rem] drop-shadow-[0_10px_15px_rgba(0,0,0)]">
            <div
              className="w-full h-full bg-cover"
              style={{
                backgroundImage: `url(${Earth?.src})`,
                clipPath: `ellipse(80% 41% at 80% 99%)`
              }}
            >
              <ParticleAnimation color="white" />
            </div>
          </div>
        </>
      }
    >
      {/* time and overview */}
      <div className="relative grid grid-flow-row md:grid-cols-2 gap-8 items-center">
        <div className="relative flex w-full justify-center items-center">
          <Image
            src={aboutPng}
            className="animate-float drop-shadow-[-1px_2px_5px_var(--primary)]"
            alt="Collaboration With People across the globe"
            data-aos="zoom-in-left"
            data-aos-duration="3000"
            data-aos-easing="ease-in-out"
          />
          <div className="absolute top-[95%] left-1/2 transform -translate-x-1/2 translate-y-[-10px] w-[50%] h-[20px] rounded-[50%] bg-gradient-to-b from-black/30 via-black/10 to-transparent opacity-50" />
        </div>
        <div className="flex flex-col gap-2">
          <article
            className="prose text-current !max-w-[100%]"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            dangerouslySetInnerHTML={{
              __html: process.env.NEXT_PUBLIC_ABOUT_INFO!
            }}
          />
          <div className="flex gap-5">
            <Link
              href="/about"
              className="bg-primary-gradient hover:bg-primary-hover-gradient p-3 rounded-lg text-white"
            >
              Explore more
            </Link>
            <LetsConnect label="Get in Touch" />
          </div>
        </div>
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
