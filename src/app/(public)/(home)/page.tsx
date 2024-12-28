export const revalidate = 300;
export const dynamic = "force-dynamic";

import React from "react";
import dynamicImport from "next/dynamic";
import ShowIf from "@/shared/components/show-if";
import Reviews from "./(sections)/reviews";

const Main = dynamicImport(() => import("./(sections)/main"));
const About = dynamicImport(() => import("./(sections)/about"));
const Services = dynamicImport(() => import("./(sections)/services"));
const Techs = dynamicImport(() => import("./(sections)/techs"));
const Projects = dynamicImport(() => import("./(sections)/projects"));
const ContactUs = dynamicImport(() => import("./(sections)/contact-us"));

export type ContentProps = {
  hide?: boolean;
};

const componentLists = [
  {
    component: <Main />,
    show: true
  },
  {
    component: <About />,
    show: true
  },
  {
    component: <Services />,
    show: true
  },
  {
    component: <Techs />,
    show: true
  },
  {
    component: <Projects />,
    show: true
  },
  {
    component: <Reviews />,
    show: true
  },
  {
    component: <ContactUs />,
    show: true
  }
];

const page = () => {
  return componentLists?.map((item, index) => (
    <ShowIf key={index} conditionalRenderKey={item?.show || false}>
      {item?.component ?? null}
    </ShowIf>
  ));
};

export default page;
