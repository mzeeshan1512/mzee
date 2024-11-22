import React from "react";
import FallBackLayout from "./fall-back-layout";
import ParticleAnimation from "../components/particles-animation";
import Countdown from "./(components)/count-down";
import SocialIcons from "../components/social-share";
import { socialContact } from "../constants-enums/navigation-list";

const MaintenanceMode = () => {
  return (
    <FallBackLayout customContent>
      <div className="relative h-screen w-screen inset-0">
        {/* <div className="absolute inset-0 w-full h-full z-[1000] bg-[rgba(107,104,104,0.07)] backdrop-blur-[0px]" /> */}
        <div className="absolute z-[100] inset-0">
          <ParticleAnimation />
        </div>
        <div className="relative flex flex-col justify-center items-center h-screen gap-2 z-[100]">
          <h1 className="prose text-gradient text-[clamp(30px,5vw,2vw+60px)] font-extrabold">
            <i>{process.env.NEXT_PUBLIC_MAINTENANCE_MODE_TITLE}</i>
          </h1>
          <Countdown
            targetDate={
              process.env.NEXT_PUBLIC_CountDownDate || "2024-11-02T00:00:00Z"
            }
          />
          {process.env.NEXT_PUBLIC_MAINTENANCE_MODE_HEADING && (
            <p className="container w-calc-10 text-wrap text-center text-base">
              {process.env.NEXT_PUBLIC_MAINTENANCE_MODE_HEADING}
            </p>
          )}
          <SocialIcons
            socialContact={socialContact}
            linkProps={{
              className: "!text-[white] hover-gradient-background mt-2",
              style: { "--hover-color": "white" } as React.CSSProperties
            }}
          />
        </div>
      </div>
    </FallBackLayout>
  );
};

export default MaintenanceMode;
