export const revalidate = 300; // Revalidate every 5 minutes (300 seconds)

import React from "react";
import dynamic from "next/dynamic";
import ShowIf from "@/shared/components/show-if";
import Reviews from "./(sections)/reviews";

const Main = dynamic(() => import("./(sections)/main"));
const About = dynamic(() => import("./(sections)/about"));
const Services = dynamic(() => import("./(sections)/services"));
const Techs = dynamic(() => import("./(sections)/techs"));
const Projects = dynamic(() => import("./(sections)/projects"));
const ContactUs = dynamic(() => import("./(sections)/contact-us"));

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
