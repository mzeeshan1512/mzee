import React from "react";
import { sectionIds } from "@/shared/constants-enums/navigation-list";
import { DefaultBg } from "@/shared/config";
import ParticleAnimation from "@/shared/components/particles-animation";

const Main = () => {
  return (
    <section
      id={sectionIds.home}
      className="responsive-height relative m-0 !bg-cover !bg-no-repeat bg-fixed w-full"
      style={{
        backgroundImage: `url(${DefaultBg?.src}`
      }}
    >
      <div className="container mx-auto">
        <ParticleAnimation color="white" />
      </div>
    </section>
  );
};

export default Main;
