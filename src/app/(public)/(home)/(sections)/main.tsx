import React from "react";
import {
  sectionIds,
  socialContact
} from "@/shared/constants-enums/navigation-list";
import { DefaultBg } from "@/shared/config";
import ParticleAnimation from "@/shared/components/particles-animation";
import JumbledTextAnimation from "@/shared/components/text-loop/jumbled-text-animation";
import Button from "@/shared/components/button";
import SocialIcons from "@/shared/components/social-share";

const Main = () => {
  return (
    <section
      id={sectionIds.home}
      className="responsive-height relative m-0 !bg-cover !bg-no-repeat bg-fixed w-full"
      style={{
        backgroundImage: `url(${DefaultBg?.src}`
      }}
    >
      <ParticleAnimation color="white" />
      <div className="absolute top-0 left-0 z-10 flex flex-col gap-2 justify-center items-center h-full w-full">
        <div data-aos="fade-down-left" data-aos-duration="2000">
          <h1 className="text-white text-[clamp(30px,5vw,2vw+60px)] font-semibold">
            Hi, I’m{" "}
            <strong className="text-gradient">
              {process.env.NEXT_PUBLIC_INITIAL || ""}{" "}
              {process.env.NEXT_PUBLIC_USER_NAME || ""}
            </strong>
          </h1>
        </div>
        <JumbledTextAnimation
          wordsList={process.env.NEXT_PUBLIC_HOME_SKILLS?.split(",") || []}
          className="text-secondary-500 !text-[clamp(25px,5vw,1vw+45px)] mb-2 pb-2 !font-medium text-ellipsis sm:text-[clamp(20px,4vw,35px)] text-gradient-left"
        />
        <h2
          data-aos="fade-up-right"
          data-aos-duration="2000"
          className="text-white font-bold text-[clamp(15px,2vw,1vw+30px)]"
        >
          based in{" "}
          <strong className="text-gradient">
            {process.env.NEXT_PUBLIC_COUNTRY}
          </strong>
          <span className="text-gradient ms-1">
            {process.env.NEXT_PUBLIC_COUNTRY_URDU}
          </span>
        </h2>
        <div
          data-aos="fade-up"
          data-aos-duration="2000"
          className="flex items-center gap-2 mt-2 pt-2"
        >
          <Button className="bg-primary-gradient hover:bg-primary-hover-gradient ">
            Hire Me.
          </Button>
          <SocialIcons
            socialContact={socialContact}
            linkProps={{
              className: "!text-[white] hover-gradient-background",
              style: { "--hover-color": "white" } as React.CSSProperties
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Main;
