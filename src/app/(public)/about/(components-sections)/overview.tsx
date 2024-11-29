import React from "react";
import Image from "next/image";
import { chatLogo } from "@/shared/app-config";
import SocialIcons from "@/shared/components/social-share";
import { socialContact } from "@/shared/constants-enums/navigation-list";

const Overview = () => {
  return (
    <>
      <div className="order-1 md:order-2">
        <div className="p-2 mx-auto md:sticky md:top-0 md:inset-x-0 overflow-hidden">
          <div className="flex flex-col gap-3 justify-center w-full items-center">
            <Image
              src={chatLogo}
              alt={process.env.NEXT_PUBLIC_APP_Name || ""}
              className="w-3/4 h-3/4 p-2 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 aspect-square transition-all ease-in-out hover:scale-110"
              data-aos="zoom-in"
              data-aos-duration="1000"
            />
            <h1 className="text-[clamp(15px,2vw,2vw+15px)] text-center">
              <b
                className="text-gradient"
                data-aos="zoom-in"
                data-aos-duration="1000"
              >
                {process.env.NEXT_PUBLIC_APP_Name}
              </b>
            </h1>
            <p
              className="text-center !text-gray-400"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              Software Engineer
            </p>
            <div data-aos="zoom-in" data-aos-duration="1000">
              <SocialIcons socialContact={socialContact} />
            </div>
          </div>
        </div>
      </div>
      <article
        className="order-2 md:order-1 md:col-span-2"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat
        lectus erat, in eleifend ipsum facilisis et. Aenean lacinia dignissim
        ante. Maecenas ac mauris odio. Vivamus volutpat mauris at justo sagittis
        viverra. Ut condimentum commodo iaculis. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos. Nunc
        tincidunt risus mi, et rhoncus est condimentum et. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Morbi tempor neque turpis, vel
        bibendum lacus elementum nec. Suspendisse lacinia varius suscipit.
        Aliquam tempor ornare metus, et vehicula felis eleifend tincidunt. Donec
        a vehicula tortor. Nulla aliquet iaculis imperdiet. Vivamus blandit
        turpis vel leo vestibulum, sed finibus enim imperdiet. Donec vitae nulla
        massa. Praesent quis pharetra nisl, nec ullamcorper erat. Suspendisse
        sapien lectus, luctus quis faucibus a, viverra vel sapien. Nulla et nunc
        bibendum, vehicula neque vitae, rutrum nibh. Donec maximus volutpat
        purus, gravida hendrerit magna laoreet et. Integer laoreet diam id lorem
        efficitur sagittis. Vivamus dapibus luctus ullamcorper. Mauris interdum
        massa dolor, eu ornare arcu ultricies sit amet. Phasellus in risus vitae
        massa iaculis gravida. Praesent ut neque mauris. Cras nec risus et nibh
        scelerisque dignissim. Etiam velit orci, venenatis at est non, dictum
        pharetra diam. Nulla facilisi. Donec rutrum mi et libero euismod
        elementum. Maecenas at rutrum lacus. Etiam eu dictum mi. Sed bibendum
        consectetur velit, vel tincidunt nulla molestie id. Vivamus vulputate
        lacus ante, ut ornare lectus accumsan ac. Cras at purus ultricies,
        facilisis tortor non, porttitor urna. Donec condimentum semper dui, id
        imperdiet dui placerat non. Quisque malesuada turpis quis sapien luctus,
        quis vulputate erat tempus. Sed cursus purus quis lorem molestie, id
        semper dui vulputate. Quisque tempor massa arcu, non consequat metus
        porta in. Suspendisse potenti. Curabitur nec orci vel sem aliquam
        hendrerit a sit amet ante. Curabitur congue consectetur scelerisque.
        Aenean malesuada maximus velit, eu suscipit magna mollis vitae.
        Suspendisse quis iaculis libero, eget ultrices tellus. Aliquam erat
        volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam ac malesuada enim. Vivamus faucibus ornare nisl, sed pulvinar
        ipsum interdum a. Phasellus gravida nisi et nunc bibendum egestas. Donec
        vel ornare mi. Suspendisse sit amet lorem efficitur tortor rutrum
        venenatis. Duis vulputate ante vel ante pharetra viverra. Nunc euismod
        est ac mi consequat pretium. Aenean at aliquam felis, eu malesuada eros.
        Integer a sollicitudin libero. Pellentesque porta lobortis arcu eu
        tincidunt. Duis vel quam libero
      </article>
    </>
  );
};

export default Overview;
